import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private injector: Injector, private translateService: TranslateService) {}

  private get messageService(): MessageService {
    return this.injector.get(MessageService);
  }

  public success(messageKey: string, namespace: string = '', sticky: boolean = false): void {
    this.add('success', messageKey, namespace, sticky);
  }

  public info(messageKey: string, namespace: string = '', sticky: boolean = false): void {
    this.add('info', messageKey, namespace, sticky);
  }

  public warning(messageKey: string, namespace: string = '', sticky: boolean = false): void {
    this.add('warning', messageKey, namespace, sticky);
  }

  public error(messageKey: string, namespace: string = '', sticky: boolean = true): void {
    this.add('error', messageKey, namespace, sticky);
  }

  public clear(key?: string): void {
    this.messageService.clear(key);
  }

  private add(severity: string, messageKey: string, namespace: string, sticky: boolean) {
    messageKey = namespace.length ? `${namespace}.${messageKey}` : messageKey;
    this.translateService.get(messageKey).subscribe((detail) => {
      this.messageService.add({
        sticky,
        severity,
        detail,
      });
    });
  }
}
