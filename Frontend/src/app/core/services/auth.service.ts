import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';

export type AuthStep = 'login' | 'emailConfirmation' | '2fa' | 'authenticated';
export interface TwoFaStatus {
  isTwoFactorEnabled: boolean;
  isSms2FaEnabled: boolean;
}
interface LoginResponse {
  status: string;
  message?: string;
  method?: string;
  twoFaToken?: string;
  success?: boolean;

  accessToken?: string;

  user?: User;

  hiddenPhoneNumber?: string;
}
interface AuthRequest {
  email: string;
  password: string;
}

export interface SomeResponse {
  message: string;
  success?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly baseUrl = environment.apiUrl;

  readonly _currentUser = signal<User | null>(null);
  readonly accessToken = signal<string | null>(null);
  readonly twoFaToken = signal<string | null>(null);
  readonly authStep = signal<AuthStep>('login');
  readonly isAuthReady = signal(false);
  readonly isLoggedIn = computed(() => !!this.accessToken());
  readonly returnUrl = signal<string | null>(null);

  readonly backupCodes = signal<string[] | null>(null);
  readonly twoFaStatus = signal<TwoFaStatus | null>(null);

  setReturnUrl(url: string | null) {
    this.returnUrl.set(url);
  }
  getReturnUrl(): string | null {
    return this.returnUrl();
  }
  clearReturnUrl() {
    this.returnUrl.set(null);
  }

  login(payload: AuthRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, payload, {
        withCredentials: true,
      })
      .pipe(
        tap(response => {
          if (response.status === 'email_not_verified') {
            this.authStep.set('emailConfirmation');
          } else if (response.status === '2fa_required') {
            this.authStep.set('2fa');
            this.twoFaStatus.set({
              isTwoFactorEnabled: response.method === 'totp' ? true : false,
              isSms2FaEnabled: response.method === 'sms' ? true : false,
            });
            if (response.twoFaToken) this.twoFaToken.set(response.twoFaToken);
          } else if (response.accessToken && response.user) {
            this.accessToken.set(response.accessToken);
            this._currentUser.set(response.user);
            this.twoFaToken.set(null);

            if (response.user?.profilePhoto?.startsWith('/uploads')) {
              this._currentUser.set({
                ...response.user,
                profilePhoto: `${this.baseUrl}${response.user.profilePhoto}`,
              });
            }

            this.authStep.set('authenticated');
            this.twoFaStatus.set({
              isTwoFactorEnabled: false,
              isSms2FaEnabled: false,
            });
            const returnUrl = this.getReturnUrl();
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              this.clearReturnUrl();
            }
          }
          this.isAuthReady.set(true);
        })
      );
  }
  socialLogin(token: string): Observable<{ success: boolean }> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/auth/social`,
        { token },
        {
          withCredentials: true,
        }
      )
      .pipe(
        switchMap(() => this.refreshToken()),
        map(response => {
          // якщо refreshToken віддав user і accessToken — логін успішний
          if (response?.user && response?.accessToken) {
            return {
              success: true,
            };
          }
          return { success: false };
        }),
        catchError(err => {
          console.error('Social login error:', err);
          return of({ success: false });
        })
      );
  }

  logout(): void {
    this.http
      .post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.accessToken.set(null);
          this._currentUser.set(null);
          this.twoFaStatus.set(null);
          this.twoFaToken.set(null);
          this.authStep.set('login');
          this.router.navigate(['/']);
        },
        error: () => {
          this.accessToken.set(null);
          this._currentUser.set(null);
          this.twoFaStatus.set(null);
          this.twoFaToken.set(null);
          this.authStep.set('login');
          this.router.navigate(['/']);
        },
      });
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(response => {
          if (response.accessToken && response.user) {
            this.accessToken.set(response.accessToken);
            this._currentUser.set(response.user);
            if (response.user?.profilePhoto?.startsWith('/uploads')) {
              this._currentUser.set({
                ...response.user,
                profilePhoto: `${this.baseUrl}${response.user.profilePhoto}`,
              });
            }
            this.get2faStatus().subscribe({
              next: response => {
                this.twoFaStatus.set(response);
              },
              error: err => {
                console.error('Get 2FA status error:', err);
              },
            });
            this.authStep.set('authenticated');
            const returnUrl = this.getReturnUrl(); // AuthService
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              this.clearReturnUrl();
            }
          }
          this.isAuthReady.set(true);
        })
      );
  }

  register(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/register`, user);
  }

  forgotPassword(email: string): Observable<SomeResponse> {
    return this.http.post<SomeResponse>(
      `${this.baseUrl}/auth/forgot-password`,
      {
        email,
      }
    );
  }

  resetPassword(
    email: string,
    token: string,
    newPassword: string
  ): Observable<SomeResponse> {
    return this.http.post<SomeResponse>(`${this.baseUrl}/auth/reset-password`, {
      email,
      token,
      newPassword,
    });
  }
  changePassword(newPassword: string): Observable<SomeResponse> {
    return this.http.post<SomeResponse>(
      `${this.baseUrl}/auth/change-password`,
      {
        newPassword,
      }
    );
  }

  resendVerification(email: string): Observable<SomeResponse> {
    return this.http.post<SomeResponse>(
      `${this.baseUrl}/auth/resend-verification`,
      { email }
    );
  }

  verifyEmail(email: string, token: string): Observable<SomeResponse> {
    return this.http.post<SomeResponse>(`${this.baseUrl}/auth/confirm-email`, {
      email,
      token,
    });
  }

  setupTotp(): Observable<{
    qrCodeImage: string;
    manualKey: string;
  }> {
    return this.http.post<{
      qrCodeImage: string;
      manualKey: string;
    }>(`${this.baseUrl}/auth/2fa/totp/setup`, null);
  }

  verifyTotpSetup(code: string): Observable<{
    success: boolean;
    message: string;
    recoveryCodes: string[];
  }> {
    return this.http
      .post<{
        success: boolean;
        message: string;
        recoveryCodes: string[];
      }>(`${this.baseUrl}/auth/2fa/totp/verify-setup`, { code })
      .pipe(
        switchMap(res => {
          if (res.success) {
            return this.get2faStatus().pipe(
              tap(status => {
                this.twoFaStatus.set(status);
              }),
              map(() => res)
            );
          } else {
            return of(res);
          }
        })
      );
  }

  verifyTotp(code: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/auth/2fa/totp/verify`,
        { code, twoFaToken: this.twoFaToken() },
        { withCredentials: true }
      )
      .pipe(
        tap(response => {
          if (response && response.accessToken && response.user) {
            this.accessToken.set(response.accessToken);
            this._currentUser.set(response.user);
            if (response.user?.profilePhoto?.startsWith('/uploads')) {
              this._currentUser.set({
                ...response.user,
                profilePhoto: `${this.baseUrl}${response.user.profilePhoto}`,
              });
            }

            this.get2faStatus().subscribe({
              next: response => {
                this.twoFaStatus.set(response);
              },
              error: err => {
                console.error('Get 2FA status error:', err);
              },
            });
            this.authStep.set('authenticated');
            const returnUrl = this.getReturnUrl();
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              this.clearReturnUrl();
            }
            this.twoFaToken.set(null);
          }
        })
      );
  }

  disableTotp(): Observable<{
    isTwoFactorEnabled: boolean;
    isSms2FaEnabled: boolean;
  }> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/auth/2fa/totp/disable`, null)
      .pipe(
        switchMap(() => this.get2faStatus()),
        tap(status => this.twoFaStatus.set(status))
      );
  }

  getTotpBackupCodes(): Observable<{
    success: boolean;
    message: string;
    backupCodes: string[];
  }> {
    return this.http.get<{
      success: boolean;
      message: string;
      backupCodes: string[];
    }>(`${this.baseUrl}/auth/2fa/totp/backup-codes`);
  }

  regenerateTotpBackupCodes(): Observable<{
    success: boolean;
    message: string;
    backupCodes: string[];
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      backupCodes: string[];
    }>(`${this.baseUrl}/auth/2fa/totp/regenerate-backup-codes`, null);
  }

  verifyTotpBackupCode(code: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/auth/2fa/totp/verify-backup-code`,
        { code, twoFaToken: this.twoFaToken() },
        { withCredentials: true }
      )
      .pipe(
        tap(response => {
          if (response && response.accessToken && response.user) {
            this.accessToken.set(response.accessToken);
            this._currentUser.set(response.user);
            if (response.user?.profilePhoto?.startsWith('/uploads')) {
              this._currentUser.set({
                ...response.user,
                profilePhoto: `${this.baseUrl}${response.user.profilePhoto}`,
              });
            }

            this.get2faStatus().subscribe({
              next: status => {
                this.twoFaStatus.set(status);
              },
              error: err => {
                console.error('Get 2FA status error:', err);
              },
            });

            this.authStep.set('authenticated');
            const returnUrl = this.getReturnUrl();
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              this.clearReturnUrl();
            }
            this.twoFaToken.set(null);
          }
        })
      );
  }

  setupSms2fa(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/auth/2fa/sms/setup`,
      {}
    );
  }

  verifySmsSetup(code: string): Observable<{ message: string }> {
    return this.http
      .post<{
        message: string;
      }>(`${this.baseUrl}/auth/2fa/sms/verify-setup`, { code })
      .pipe(
        switchMap(res =>
          this.get2faStatus().pipe(
            tap(status => {
              this.twoFaStatus.set(status);
            }),
            map(() => res)
          )
        )
      );
  }

  sendSms2fa(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/auth/2fa/sms/send`,
      { twoFaToken: this.twoFaToken() }
    );
  }

  verifySms2fa(code: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/auth/2fa/sms/verify`,
        { code, twoFaToken: this.twoFaToken() },
        { withCredentials: true }
      )
      .pipe(
        tap(response => {
          if (response && response.accessToken && response.user) {
            this.accessToken.set(response.accessToken);
            this._currentUser.set(response.user);
            if (response.user?.profilePhoto?.startsWith('/uploads')) {
              this._currentUser.set({
                ...response.user,
                profilePhoto: `${this.baseUrl}${response.user.profilePhoto}`,
              });
            }
            this.get2faStatus().subscribe({
              next: response => {
                this.twoFaStatus.set(response);
              },
              error: err => {
                console.error('Get 2FA status error:', err);
              },
            });
            this.authStep.set('authenticated');
            const returnUrl = this.getReturnUrl();
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              this.clearReturnUrl();
            }
            this.twoFaToken.set(null);
          }
        })
      );
  }

  disableSms2fa(): Observable<{
    isTwoFactorEnabled: boolean;
    isSms2FaEnabled: boolean;
  }> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/auth/2fa/sms/disable`, null)
      .pipe(
        switchMap(() => this.get2faStatus()),
        tap(status => this.twoFaStatus.set(status))
      );
  }

  get2faStatus(): Observable<{
    isTwoFactorEnabled: boolean;
    isSms2FaEnabled: boolean;
  }> {
    return this.http.get<{
      isTwoFactorEnabled: boolean;
      isSms2FaEnabled: boolean;
    }>(`${this.baseUrl}/auth/2fa/status`);
  }
  refresh2faStatus(): void {
    this.get2faStatus().subscribe({
      next: response => {
        this.twoFaStatus.set(response);
      },
      error: err => {
        console.error('Get 2FA status error:', err);
      },
    });
  }

  disableAll2fa(): Observable<{
    isTwoFactorEnabled: boolean;
    isSms2FaEnabled: boolean;
  }> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/auth/2fa/disable-all`, null)
      .pipe(
        switchMap(() => this.get2faStatus()),
        tap(status => this.twoFaStatus.set(status))
      );
  }

  getRecoveryCodes(): Observable<{ recoveryCodes: string[] }> {
    return this.http.get<{ recoveryCodes: string[] }>(
      `${this.baseUrl}/auth/2fa/recovery-codes`
    );
  }

  useRecoveryCode(code: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/auth/2fa/use-recovery-code`,
        { code, twoFaToken: this.twoFaToken() },
        { withCredentials: true }
      )
      .pipe(
        tap(response => {
          if (response && response.accessToken && response.user) {
            this.accessToken.set(response.accessToken);
            this._currentUser.set(response.user);
            if (response.user?.profilePhoto?.startsWith('/uploads')) {
              this._currentUser.set({
                ...response.user,
                profilePhoto: `${this.baseUrl}${response.user.profilePhoto}`,
              });
            }

            this.get2faStatus().subscribe({
              next: status => {
                this.twoFaStatus.set(status);
              },
              error: err => {
                console.error('Get 2FA status error:', err);
              },
            });

            this.authStep.set('authenticated');
            const returnUrl = this.getReturnUrl();
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              this.clearReturnUrl();
            }
            this.twoFaToken.set(null);
          }
        })
      );
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }
  getCurrentUser(): User | null {
    return this._currentUser();
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn();
  }
  setAccessToken(token: string | null): void {
    this.accessToken.set(token);
  }
  getAuthStep(): AuthStep {
    return this.authStep();
  }

  updateUser(user: Partial<User>): Observable<User> {
    if (!this._currentUser()) {
      throw new Error('No current user');
    }

    return this.http.put<User>(`${this.baseUrl}/users/me`, { ...user }).pipe(
      tap(response => {
        this._currentUser.set(response);
        if (response?.profilePhoto?.startsWith('/uploads')) {
          this._currentUser.set({
            ...response,
            profilePhoto: `${this.baseUrl}${response.profilePhoto}`,
          });
        }
      }),
      catchError(err => {
        console.error('Update user error:', err);
        return throwError(() => err);
      })
    );
  }
}
