import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private injector: Injector, private translateService: TranslateService) {
  }

  private get messageService(): MessageService {
    return this.injector.get(MessageService);
  }

  public success(messageKey: string, sticky: boolean = false): void {
    this.add('success', messageKey, sticky);
  }

  public info(messageKey: string, sticky: boolean = false): void {
    this.add('info', messageKey, sticky);
  }

  public warning(messageKey: string, sticky: boolean = false): void {
    this.add('warning', messageKey, sticky);
  }

  public error(messageKey: string, sticky: boolean = false): void {
    this.add('error', messageKey, sticky);
  }

  public clear(key?: string): void {
    this.messageService.clear(key);
  }

  private add(severity: string, messageKey: string, sticky: boolean) {
    this.translateService.get(messageKey).subscribe((detail) => {
      this.messageService.add({
        sticky,
        severity,
        detail,
      });
    });
  }
}
