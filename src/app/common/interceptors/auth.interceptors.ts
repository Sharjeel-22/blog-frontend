import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authService = inject(AuthService);
    router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const isAuthRequest = req.url.includes('/auth/login') || 
                             req.url.includes('/auth/register') ||
                             req.url.includes('/auth/test');
        const authToken = this.authService.getToken();

        let authReq = req;
        if (authToken && !isAuthRequest && this.authService.isAuthenticated()) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
        } else if (isAuthRequest) {
            authReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            console.log('No valid token available or token expired');
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        this.authService.logout();
                        this.router.navigate(['/login']);
                        break;
                    case 403:
                        break;
                    case 0:
                        break;
                    default:
                        console.log(`HTTP ${error.status} Error:`, error.message);
                }

                return throwError(() => error);
            })
        );
    }
}