import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../core/notifications/notification.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './auth-pages.component.css',
})
export class RegisterPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  protected readonly isLoading = signal(false);
  protected readonly hidePassword = signal(true);
  protected readonly hidePasswordConfirm = signal(true);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  protected readonly passwordsMismatch = computed(
    () => this.form.getRawValue().password !== this.form.getRawValue().confirmPassword,
  );

  protected submit(): void {
    if (this.form.invalid || this.passwordsMismatch() || this.isLoading()) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, username, password } = this.form.getRawValue();
    this.isLoading.set(true);
    this.authService.register({ email, username, password }).subscribe({
      next: (response) => {
        this.authService.logout();
        this.notifications.success(response.message);
        this.router.navigate(['/login']);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
