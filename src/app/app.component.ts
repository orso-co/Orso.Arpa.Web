import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Arpa 2.0';
  constructor(public translate: TranslateService) {
    translate.addLangs(['de', 'ed']);
    translate.setDefaultLang('de'); // used as a fallback when a translation isn't found

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'de');
  }
}
