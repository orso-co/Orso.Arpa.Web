import { Injectable, NgZone } from '@angular/core';
import { NotificationsService } from './services/notifications.service';
import { LoadingService } from './services/loading.service';
import { LoggerService } from './services/logger.service';

@Injectable()
export class ErrorHandler {
  constructor(private notificationsService: NotificationsService,
              private loaderService: LoadingService,
              private zone: NgZone,
              private logger: LoggerService) {
  }

  handleError(error: Error | any) {
    if (error) {
      this.zone.run(() => {
        this.loaderService.reset();
        this.logger.error(error);
        if (error.message) {
          this.notificationsService.error(error.message);
        } else if (error.title) {
          this.notificationsService.error(error.title);
        }
      });
    }
  }
}
