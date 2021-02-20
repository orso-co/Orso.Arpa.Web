import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrService: ToastrService, private translateService: TranslateService) {}

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

  public eccor(messageKey: string): void {
    this.translateService.get(messageKey).subscribe((translation) => {
      this.toastrService.error(translation);
    });
  }
}
