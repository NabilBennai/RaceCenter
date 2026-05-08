import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/auth/auth.service';

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
  private readonly toastr = inject(ToastrService);

  protected readonly status = signal<'loading' | 'success' | 'error'>('loading');
  protected readonly message = signal('Vérification en cours...');

  constructor() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.status.set('error');
      this.message.set('Lien de vérification invalide');
      return;
    }

    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        this.status.set('success');
        this.message.set(response.message);
        this.toastr.success(response.message);
      },
      error: (error) => {
        const message = error?.error?.message ?? 'Vérification impossible';
        this.status.set('error');
        this.message.set(message);
        this.toastr.error(message);
      },
    });
  }
}
