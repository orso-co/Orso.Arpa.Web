import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrService: ToastrService, private translateService: TranslateService) {}

  public success(messageKey: string): void {
    this.toastrService.success(this.translateService.instant(messageKey));
  }

  public info(messageKey: string): void {
    this.toastrService.info(this.translateService.instant(messageKey));
  }

  public error(messageKey: string): void {
    this.toastrService.error(this.translateService.instant(messageKey));
  }
}
