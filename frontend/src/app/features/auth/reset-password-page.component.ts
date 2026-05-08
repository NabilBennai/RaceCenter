import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../core/notifications/notification.service';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './auth-pages.component.css',
})
export class ResetPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  protected readonly isLoading = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  protected readonly passwordsMismatch = computed(
    () => this.form.getRawValue().password !== this.form.getRawValue().confirmPassword,
  );

  protected submit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token || this.form.invalid || this.passwordsMismatch() || this.isLoading()) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.authService.resetPassword(token, this.form.getRawValue().password).subscribe({
      next: (response) => {
        this.notifications.success(response.message);
        this.router.navigate(['/login']);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
