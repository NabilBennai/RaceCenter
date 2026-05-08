import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly isAuthenticated = computed(() => this.authService.isAuthenticated());
  protected readonly currentUser = computed(() => this.authService.user());

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
