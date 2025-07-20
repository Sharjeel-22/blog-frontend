import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LOGIN_IMPORTS } from '../../model/login-models/login-imports';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../common/auth/auth.service';
import { LoginRequest } from '../../common/interfaces/AuthInterface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...LOGIN_IMPORTS],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _messageService = inject(MessageService);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  public isAdminEmail = signal('sharjeel@gmail.com');
  public isAdminPassword = signal('sharjeel123');

  loginForm!: FormGroup;
  isLoading = signal<boolean>(false);
  rememberMe = signal<boolean>(false);
  showPassword = signal<boolean>(false);

  ngOnInit(): void {
    this.initializeForm();
    this.loadRememberedCredentials();
    this.checkExistingLogin();
  }

  private initializeForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private loadRememberedCredentials(): void {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const isRemembered = localStorage.getItem('rememberMe') === 'true';

    if (isRemembered && rememberedEmail) {
      this.loginForm.patchValue({ email: rememberedEmail });
      this.rememberMe.set(true);
    }
  }

  private checkExistingLogin(): void {
    this._authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this._router.navigate(['/home']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading()) {
      this.isLoading.set(true);

      const formValue = this.loginForm.value;
      const loginRequest: LoginRequest = {
        email: formValue.email,
        password: formValue.password
      };

      this._authService.login(loginRequest)
        .pipe(
          catchError((error) => {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please try again.';

            if (error.status === 401) {
              errorMessage = 'Invalid email or password.';
            } else if (error.status === 0) {
              errorMessage = 'Cannot connect to server. Please check your connection.';
            } else if (error.error?.message) {
              errorMessage = error.error.message;
            }

            this._messageService.add({
              severity: 'error',
              summary: 'Login Failed',
              detail: errorMessage,
              life: 5000
            });

            return of(null);
          }),
          finalize(() => {
            this.isLoading.set(false);
          })
        )
        .subscribe((response) => {
          if (response) {
            if (this.rememberMe()) {
              localStorage.setItem('rememberedEmail', formValue.email);
              localStorage.setItem('rememberMe', 'true');
            } else {
              localStorage.removeItem('rememberedEmail');
              localStorage.removeItem('rememberMe');
            }
            this._messageService.add({
              severity: 'success',
              summary: 'Login Successful',
              detail: `Welcome back, ${response.user.firstName} ${response.user.lastName}!`,
              life: 4000
            });
            this._router.navigate(['/home']);
          }
        });
    } else {
      this.markFormGroupTouched();
      this._messageService.add({
        severity: 'error',
        summary: 'Form Invalid',
        detail: 'Please check your credentials and try again.',
        life: 4000
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (field.errors['minlength']) {
        return `Password must be at least ${field.errors['minlength'].requiredLength} characters long.`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      email: 'Email',
      password: 'Password'
    };
    return labels[fieldName] || fieldName;
  }

  togglePassword(): void {
    this.showPassword.update(value => !value);
  }

  onForgotPassword(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Password Reset',
      detail: 'Password reset instructions will be sent to your email.',
      life: 4000
    });
  }

  onGoogleLogin(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Google Login',
      detail: 'Redirecting to Google authentication...',
      life: 3000
    });
  }

  onMicrosoftLogin(): void {
    this._messageService.add({
      severity: 'info',
      summary: 'Microsoft Login',
      detail: 'Redirecting to Microsoft authentication...',
      life: 3000
    });
  }

  navigateToRegister(): void {
    this._router.navigate(['/register']);
  }

  onInputFocus(fieldName: string): void {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors) {
    }
  }

  onEnterKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.loginForm.valid) {
      this.onSubmit();
    }
  }

  fillDefaultCredentials(): void {
    this.loginForm.patchValue({
      email: this.isAdminEmail(),
      password: this.isAdminPassword()
    });
  }
}