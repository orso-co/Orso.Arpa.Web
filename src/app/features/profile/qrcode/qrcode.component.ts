import { Component, OnInit } from '@angular/core';
import { MeService } from '../../../shared/services/me.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';

@Component({
  selector: 'arpa-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QRCodeComponent implements OnInit {

  public qrCode: SafeResourceUrl;

  constructor(private meService: MeService, private sanitizer: DomSanitizer, private notifications: NotificationsService) {
  }

  ngOnInit(): void {
    this.meService.getMyQrCode().subscribe(img => {
      this.qrCode = this.sanitizer.bypassSecurityTrustResourceUrl(`data:img/png;base64,${img}`);
    });
  }

  sendEmail() {
    this.meService.getMyQrCode(true).subscribe(() => {
      this.notifications.success('SEND_QR_CODE_SUCCESS', 'profile');
    });
  }
}