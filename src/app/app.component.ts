import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'arpa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Arpa 2.0';
  constructor(
    public translate: TranslateService,
    private primengConfig: PrimeNGConfig
  ) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de'); // used as a fallback when a translation isn't found

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'de');
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
