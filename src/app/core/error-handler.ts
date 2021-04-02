import { Injectable, NgZone } from '@angular/core';
import { NotificationsService } from './services/notifications.service';

@Injectable()
export class ErrorHandler {
  constructor(private notificationsService: NotificationsService, private zone: NgZone) {
  }

  handleError(error: Error) {
    this.zone.run(() => this.notificationsService.error(error.message));
  }
}
