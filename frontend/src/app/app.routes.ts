import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { guestOnlyGuard } from './core/auth/guest-only.guard';
import { ForgotPasswordPageComponent } from './features/auth/forgot-password-page.component';
import { LoginPageComponent } from './features/auth/login-page.component';
import { RegisterPageComponent } from './features/auth/register-page.component';
import { ResetPasswordPageComponent } from './features/auth/reset-password-page.component';
import { VerifyEmailPageComponent } from './features/auth/verify-email-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { ProfilePageComponent } from './features/profile/profile-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent, canActivate: [guestOnlyGuard] },
  { path: 'register', component: RegisterPageComponent, canActivate: [guestOnlyGuard] },
  { path: 'verify-email', component: VerifyEmailPageComponent, canActivate: [guestOnlyGuard] },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    canActivate: [guestOnlyGuard],
  },
  { path: 'reset-password', component: ResetPasswordPageComponent, canActivate: [guestOnlyGuard] },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
