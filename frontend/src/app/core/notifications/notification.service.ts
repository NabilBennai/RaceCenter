import { Injectable, inject } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

type NotificationLevel = 'success' | 'info' | 'warning' | 'error';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly toastr = inject(ToastrService);

  success(message: string, title = 'Succès', config?: Partial<IndividualConfig>): void {
    this.show('success', message, title, config);
  }

  info(message: string, title = 'Info', config?: Partial<IndividualConfig>): void {
    this.show('info', message, title, config);
  }

  warning(message: string, title = 'Attention', config?: Partial<IndividualConfig>): void {
    this.show('warning', message, title, config);
  }

  error(message: string, title = 'Erreur', config?: Partial<IndividualConfig>): void {
    this.show('error', message, title, config);
  }

  private show(
    level: NotificationLevel,
    message: string,
    title: string,
    config?: Partial<IndividualConfig>,
  ): void {
    this.toastr[level](message, title, config);
  }
}
