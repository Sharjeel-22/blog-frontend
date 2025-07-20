import { Component, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import BlogPost, { ContentSection } from '../../interfaces/HomePage';
import { DETAIL_IMPORTS } from '../../model/detail-models/detail.imports';
import { DetailHelperService } from '../../_services/_details-helper.service';

@Component({
  selector: 'app-blog-post-detail',
  standalone: true,
  imports: [...DETAIL_IMPORTS],
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.scss']
})
export class BlogPostDetailComponent {
  _detailHelperService = inject(DetailHelperService);
  @Input() visible: boolean = false;
  @Input() set blogPost(value: BlogPost | null) {
    this.selectedPost.set(value);
  }

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() closeDialog = new EventEmitter<void>();
  selectedPost = signal<BlogPost | null>(null);
  isImageLoading = signal<boolean>(true);
  imageError = signal<boolean>(false);

  isPostValid = computed(() => !!this.selectedPost());
  formattedPublishDate = computed(() => {
    const post = this.selectedPost();
    return post?.publishedDate ? this.formatDate(post.publishedDate) : '';
  });

  authorInitials = computed(() => {
    const post = this.selectedPost();
    return post?.author ? this.getAuthorInitials(post.author) : '';
  });

  categorySeverity = computed(() => {
    return 'secondary' as const;
  });

  onClose(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.closeDialog.emit();
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return dateObj.toLocaleDateString('en-US', options);
  }

  getAuthorInitials(author: string): string {
    if (!author) return '';

    return author
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  getCategorySeverity(category: string | undefined): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | undefined {
    return 'secondary';
  }

  getContentSections(): ContentSection[] {
    const post = this.selectedPost();
    if (!post) return [];
    return this.generateContentFromExcerpt(post);
  }

  private generateContentFromExcerpt(post: BlogPost): ContentSection[] {
    return this._detailHelperService.provideGeneratedContent(post);
  }

  onImageError(event: any): void {
    this.imageError.set(true);
    this.isImageLoading.set(false);
    event.target.style.display = 'none';
  }

  onImageLoad(): void {
    this.isImageLoading.set(false);
  }

  getEstimatedReadTime(): number {
    const post = this.selectedPost();
    if (!post) return 1;

    const excerptWords = post.excerpt ? post.excerpt.split(' ').length : 50;
    const estimatedTotalWords = excerptWords * 8;

    return Math.max(1, Math.ceil(estimatedTotalWords / 200));
  }

  sharePost(): void {
    const post = this.selectedPost();
    if (!post) return;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(console.error);
    } else {
      const shareText = `${post.title}\n${post.excerpt}\n${window.location.href}`;
      navigator.clipboard.writeText(shareText).catch(console.error);
    }
  }

  likePost(): void {
  }

  bookmarkPost(): void {
  }
}