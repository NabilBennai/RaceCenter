import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/notifications/notification.service';

interface ProfileResponse {
  username: string;
  email: string;
  bio: string | null;
  preferences: {
    favoriteTeam: string | null;
    favoriteDriver: string | null;
    favoriteConstructor: string | null;
  };
}

interface UpdateProfileRequest {
  bio: string | null;
  favoriteTeam: string | null;
  favoriteDriver: string | null;
  favoriteConstructor: string | null;
}

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly notifications = inject(NotificationService);
  protected readonly profile = signal<ProfileResponse | null>(null);
  protected readonly isSaving = signal(false);

  protected readonly form = this.fb.group({
    bio: ['', [Validators.maxLength(500)]],
    favoriteTeam: ['', [Validators.maxLength(100)]],
    favoriteDriver: ['', [Validators.maxLength(100)]],
    favoriteConstructor: ['', [Validators.maxLength(100)]],
  });

  constructor() {
    this.http.get<ProfileResponse>(`${environment.apiUrl}/profile/me`).subscribe((response) => {
      this.profile.set(response);
      this.form.patchValue({
        bio: response.bio ?? '',
        favoriteTeam: response.preferences.favoriteTeam ?? '',
        favoriteDriver: response.preferences.favoriteDriver ?? '',
        favoriteConstructor: response.preferences.favoriteConstructor ?? '',
      });
    });
  }

  protected filledPreferencesCount(profile: ProfileResponse): number {
    let count = 0;
    if (profile.preferences.favoriteTeam) {
      count += 1;
    }
    if (profile.preferences.favoriteDriver) {
      count += 1;
    }
    if (profile.preferences.favoriteConstructor) {
      count += 1;
    }
    return count;
  }

  protected saveProfile(): void {
    if (this.form.invalid || this.isSaving()) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UpdateProfileRequest = {
      bio: this.normalize(this.form.value.bio),
      favoriteTeam: this.normalize(this.form.value.favoriteTeam),
      favoriteDriver: this.normalize(this.form.value.favoriteDriver),
      favoriteConstructor: this.normalize(this.form.value.favoriteConstructor),
    };

    this.isSaving.set(true);
    this.http.put<ProfileResponse>(`${environment.apiUrl}/profile/me`, payload).subscribe({
      next: (response) => {
        this.profile.set(response);
        this.form.patchValue({
          bio: response.bio ?? '',
          favoriteTeam: response.preferences.favoriteTeam ?? '',
          favoriteDriver: response.preferences.favoriteDriver ?? '',
          favoriteConstructor: response.preferences.favoriteConstructor ?? '',
        });
        this.notifications.success('Profil mis a jour avec succes');
      },
      complete: () => this.isSaving.set(false),
    });
  }

  private normalize(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  }
}
