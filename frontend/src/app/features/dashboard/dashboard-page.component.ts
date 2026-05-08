import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent {
  private readonly http = inject(HttpClient);
  protected readonly authService = inject(AuthService);
  protected readonly profileEmail = signal<string | null>(null);

  constructor() {
    this.http
      .get<{ email: string }>(`${environment.apiUrl}/profile/me`)
      .subscribe((response) => this.profileEmail.set(response.email));
  }
}
