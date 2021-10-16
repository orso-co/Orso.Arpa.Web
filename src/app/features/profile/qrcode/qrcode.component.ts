import { Component, OnInit } from '@angular/core';
import { MeService } from '../../../shared/services/me.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'arpa-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
})
export class QRCodeComponent implements OnInit {

  public qrCode: SafeResourceUrl;

  constructor(private meService: MeService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.meService.getMyQrCode().subscribe(img => {
      this.qrCode = this.sanitizer.bypassSecurityTrustResourceUrl(`data:img/png;base64,${img}`);
    });
  }

}
