import { Component, Input, Output, EventEmitter, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import BlogPost, { CreatePostRequest, PostStatus, convertPostToBlogPost } from '../../interfaces/HomePage';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../common/_service/_posts.service';
import { AuthService } from '../../common/auth/auth.service';
import { CREAT_POST_IMPORTS } from '../../model/create-post-models/CreatePost-Imports';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [...CREAT_POST_IMPORTS],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() postCreated = new EventEmitter<BlogPost>();
  @Output() closeDialog = new EventEmitter<void>();

  private _formBuilder = inject(FormBuilder);
  private _messageService = inject(MessageService);
  private _postsService = inject(PostsService);
  private _authService = inject(AuthService);

  createPostForm!: FormGroup;
  isSubmitting = signal<boolean>(false);
  maxDate = new Date();
  currentUser = signal<string>('');
  currentUserData = signal<any>(null);

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentUser();
  }

  private initializeForm(): void {
    this.createPostForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]]
    });
  }

  private loadCurrentUser(): void {
    this._authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserData.set(user);
        this.currentUser.set(`${user.firstName} ${user.lastName}`);
      }
    });
  }

  onSubmit(): void {
    if (this.createPostForm.valid && !this.isSubmitting()) {
      const token = this._authService.getToken();

      if (!token) {
        this._messageService.add({
          severity: 'error',
          summary: 'Authentication Required',
          detail: 'Please log in to create posts.',
          life: 4000
        });
        return;
      }

      this.isSubmitting.set(true);
      const formValue = this.createPostForm.value;
      const excerpt = this.generateExcerpt(formValue.body);
      const createPostRequest: CreatePostRequest = {
        title: formValue.title.trim(),
        excerpt: formValue.body.trim(),
        summary: excerpt,
        status: PostStatus.PUBLISHED,
        publishNow: true
      };

      this._postsService.createPost(createPostRequest)
        .pipe(
          catchError((error) => {
            console.error('Create post error:', error);
            let errorMessage = 'Failed to create post. Please try again.';

            if (error.status === 401) {
              errorMessage = 'You must be logged in to create posts.';
            } else if (error.status === 400) {
              errorMessage = 'Invalid post data. Please check your input.';
            } else if (error.error?.message) {
              errorMessage = error.error.message;
            }

            this._messageService.add({
              severity: 'error',
              summary: 'Create Post Failed',
              detail: errorMessage,
              life: 5000
            });

            return of(null);
          }),
          finalize(() => {
            this.isSubmitting.set(false);
          })
        )
        .subscribe((response) => {
          if (response) {
            const blogPost = convertPostToBlogPost(response);

            this.postCreated.emit(blogPost);
            this.onClose();

            this._messageService.add({
              severity: 'success',
              summary: 'Post Created',
              detail: `"${response.title}" has been created successfully!`,
              life: 4000
            });
          }
        });
    } else {
      this.markFormGroupTouched();
      this._messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.',
        life: 3000
      });
    }
  }

  private generateExcerpt(body: string): string {
    const cleanText = body.replace(/<[^>]*>/g, '').trim();
    const words = cleanText.split(/\s+/);
    const excerptWords = words.slice(0, 30);
    let excerpt = excerptWords.join(' ');

    if (words.length > 30) {
      excerpt += '...';
    }

    return excerpt;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.createPostForm.controls).forEach(key => {
      const control = this.createPostForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  onClose(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.closeDialog.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.createPostForm.reset();
    this.isSubmitting.set(false);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.createPostForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.createPostForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} cannot exceed ${field.errors['maxlength'].requiredLength} characters.`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      title: 'Title',
      body: 'Body'
    };
    return labels[fieldName] || fieldName;
  }

  getCharacterCount(fieldName: string): string {
    const field = this.createPostForm.get(fieldName);
    const value = field?.value || '';
    const maxLength = this.getMaxLength(fieldName);
    return `${value.length}/${maxLength}`;
  }

  private getMaxLength(fieldName: string): number {
    const maxLengths: Record<string, number> = {
      title: 200,
      body: 5000
    };
    return maxLengths[fieldName] || 0;
  }

  getAuthorInitials(): string {
    return this.currentUser()
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  onCancel(): void {
    if (this.createPostForm.dirty) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Form Cancelled',
        detail: 'Your changes have been discarded.',
        life: 3000
      });
    }
    this.onClose();
  }
}