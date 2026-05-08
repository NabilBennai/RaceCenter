import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/auth/auth.service';

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
  private readonly toastr = inject(ToastrService);
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

  protected readonly passwordsMismatch = computed(() => {
    const raw = this.form.getRawValue();
    return raw.password !== raw.confirmPassword;
  });

  protected submit(): void {
    if (this.form.invalid || this.passwordsMismatch() || this.isLoading()) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, username, password } = this.form.getRawValue();
    this.isLoading.set(true);
    this.authService.register({ email, username, password }).subscribe({
      next: () => {
        this.toastr.success('Compte créé avec succès');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.toastr.error(error?.error?.message ?? 'Impossible de créer le compte');
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
