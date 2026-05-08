import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../core/notifications/notification.service';

@Component({
  selector: 'app-verify-email-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-email-page.component.html',
  styleUrl: './auth-pages.component.css',
})
export class VerifyEmailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly notifications = inject(NotificationService);

  protected readonly status = signal<'loading' | 'success' | 'error'>('loading');
  protected readonly message = signal('Verification en cours...');

  constructor() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.status.set('error');
      this.message.set('Lien de verification invalide');
      return;
    }

    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        this.status.set('success');
        this.message.set(response.message);
        this.notifications.success(response.message);
      },
      error: (error) => {
        const message = error?.error?.message ?? 'Verification impossible';
        this.status.set('error');
        this.message.set(message);
      },
    });
  }
}
