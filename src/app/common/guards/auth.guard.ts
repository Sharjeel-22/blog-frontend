import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  const isAuth = authService.isAuthenticated();
  
  if (isAuth) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};