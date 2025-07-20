import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { REGISTER_USER_IMPORTS } from '../../model/register-import/Register-Imports';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [...REGISTER_USER_IMPORTS],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _messageService = inject(MessageService);
  private _router = inject(Router);

  registerForm!: FormGroup;
  isLoading = signal<boolean>(false);
  agreeToTerms = signal<boolean>(false);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return passwordValid ? null : { passwordStrength: true };
  }

  private passwordMatchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid && this.agreeToTerms() && !this.isLoading()) {
      this.isLoading.set(true);

      const formValue = this.registerForm.value;
      
      setTimeout(() => {
        this.isLoading.set(false);
        
        this._messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: `Welcome to BlogApp, ${formValue.firstName}!`,
          life: 4000
        });

        this._router.navigate(['/login']);
      }, 2500);
    } else {
      this.markFormGroupTouched();
      
      if (!this.agreeToTerms()) {
        this._messageService.add({
          severity: 'warn',
          summary: 'Terms Required',
          detail: 'Please agree to the Terms of Service and Privacy Policy.',
          life: 3000
        });
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: 'Please check all fields and try again.',
          life: 3000
        });
      }
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters long.`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} cannot exceed ${field.errors['maxlength'].requiredLength} characters.`;
      }
      if (field.errors['passwordStrength']) {
        return 'Password must contain uppercase, lowercase, number, and special character.';
      }
    }

    if (fieldName === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match.';
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password'
    };
    return labels[fieldName] || fieldName;
  }

  onGoogleRegister(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Google Registration',
      detail: 'Google authentication would be initiated.',
      life: 3000
    });
  }

  onMicrosoftRegister(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Microsoft Registration',
      detail: 'Microsoft authentication would be initiated.',
      life: 3000
    });
  }

  navigateToLogin(): void {
    this._router.navigate(['/login']);
  }
}