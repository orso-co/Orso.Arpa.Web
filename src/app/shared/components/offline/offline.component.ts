import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MeService } from '@arpa/services';

@Component({
  selector: 'arpa-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss'],
})
export class OfflineComponent implements OnInit {

  public qrCode: SafeResourceUrl;

  constructor(private meService: MeService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.meService.getMyQrCode().subscribe(img => {
      if (img) {
        this.qrCode = this.sanitizer.bypassSecurityTrustResourceUrl(`data:img/png;base64,${img}`);
      }
    });
  }

}
