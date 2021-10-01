import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MuproComponent } from './mupro.component';
import { MuProRoutingModule } from './mupro-routing.module';
import { MuproDetailsComponent } from './mupro-details/mupro-details.component';
import { MuproProfilesComponent } from './mupro-profiles/mupro-profiles.component';
import { MuproService } from './services/mupro.service';
import { CommonTranslateModule } from '../../common/translate';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';


@NgModule({
  declarations: [MuproComponent, MuproDetailsComponent, MuproProfilesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MuProRoutingModule,
    CommonTranslateModule.forChild(['mupro', 'musician-profile']),
  ],
  providers: [
    MuproService,
  ],
})
export class MuProModule {
  constructor(private translateService: TranslateService, private languageService: LanguageService) {
    languageService.languageEvent.subscribe(lang => {
      /**
       * Reset lang for lazy module.
       * Fixes: https://github.com/ngx-translate/core/issues/1193
       */
      translateService.currentLang = '';
      translateService.use(lang);
    });
  }
}
