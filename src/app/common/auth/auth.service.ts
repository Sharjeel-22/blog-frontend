import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { User, LoginRequest, AuthResponse, RegisterRequest } from '../interfaces/AuthInterface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = environment.apiUrl;
    private readonly TOKEN_KEY = environment.tokenKey;
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkAuthStatus();
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        const url = `${this.API_URL}${environment.endpoints.auth.login}`;

        return this.http.post<AuthResponse>(url, credentials).pipe(
            tap(response => {
                if (response.access_token) {
                    this.setAuthData(response.access_token, response.user);
                }
            })
        );
    }

    register(userData: RegisterRequest): Observable<AuthResponse> {
        const url = `${this.API_URL}${environment.endpoints.auth.register}`;

        return this.http.post<AuthResponse>(url, userData).pipe(
            tap(response => {
                if (response.access_token) {
                    this.setAuthData(response.access_token, response.user);
                }
            })
        );
    }

    getProfile(): Observable<{ message: string, user: User }> {
        const url = `${this.API_URL}${environment.endpoints.auth.profile}`;
        return this.http.get<{ message: string, user: User }>(url);
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.isLoggedInSubject.next(false);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp * 1000;
            return Date.now() < expiry;
        } catch {
            return false;
        }
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    getAuthHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        });
    }

    private setAuthData(token: string, user: any): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
    }

    private checkAuthStatus(): void {
        const token = this.getToken();
        const userData = localStorage.getItem('currentUser');

        if (token && userData && this.isAuthenticated()) {
            const user = JSON.parse(userData);
            this.currentUserSubject.next(user);
            this.isLoggedInSubject.next(true);
        } else {
            this.logout();
        }
    }
}