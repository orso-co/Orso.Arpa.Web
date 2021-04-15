import { Injectable, NgZone } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { LoggerService } from './services/logger.service';

@Injectable()
export class ErrorHandler {
  constructor(private notificationsService: NotificationsService, private zone: NgZone, private logger: LoggerService) {
  }

  handleError(error: Error) {
    this.zone.run(() => {
      this.logger.error(error);
      this.notificationsService.error(error.message);
    });
  }
}
