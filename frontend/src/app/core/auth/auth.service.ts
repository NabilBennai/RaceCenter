import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, AuthUser, LoginRequest, MessageResponse, RegisterRequest } from './auth.models';

const TOKEN_KEY = 'racecenter_auth_token';
const USER_KEY = 'racecenter_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenSignal = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly userSignal = signal<AuthUser | null>(this.readStoredUser());

  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly user = computed(() => this.userSignal());

  register(payload: RegisterRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${environment.apiUrl}/auth/register`, payload);
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload)
      .pipe(tap((response) => this.persistSession(response)));
  }

  verifyEmail(token: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${environment.apiUrl}/auth/verify-email`, { token });
  }

  logout(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  token(): string | null {
    return this.tokenSignal();
  }

  private persistSession(response: AuthResponse): void {
    this.tokenSignal.set(response.accessToken);
    this.userSignal.set(response.user);
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
  }

  private readStoredUser(): AuthUser | null {
    const rawUser = localStorage.getItem(USER_KEY);
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as AuthUser;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  }
}
