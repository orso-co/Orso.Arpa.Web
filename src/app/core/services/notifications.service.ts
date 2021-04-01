import {Injectable, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private injector: Injector, private translateService: TranslateService) {
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  public success(messageKey: string): void {
    this.translateService.get(messageKey).subscribe((translation) => {
      this.toastrService.success(translation);
    });
  }

  public info(messageKey: string): void {
    this.translateService.get(messageKey).subscribe((translation) => {
      this.toastrService.info(translation);
    });
  }

  public warning(messageKey: string): void {
    this.translateService.get(messageKey).subscribe((translation) => {
      this.toastrService.warning(translation);
    });
  }

  public error(messageKey: string): void {
    this.translateService.get(messageKey).subscribe((translation) => {
      this.toastrService.error(translation);
    });
  }
}
