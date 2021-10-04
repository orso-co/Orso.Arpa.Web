import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuproComponent } from './mupro.component';
import { MuProRoutingModule } from './mupro-routing.module';
import { MuproDetailsComponent } from './mupro-details/mupro-details.component';
import { MuproProfilesComponent } from './mupro-profiles/mupro-profiles.component';
import { MuproService } from './services/mupro.service';
import { TranslateService } from '@ngx-translate/core';
import { AvatarModule } from '../../../@arpa/components/avatar/avatar.module';
import { LanguageService } from '../../../@arpa/services/language.service';
import { TranslateModule } from '../../../@arpa/translate';
import { SplitViewModule } from '../../../@arpa/components/split-view/split-view.module';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { StepsModule } from 'primeng/steps';
import { RatingModule } from 'primeng/rating';
import { BadgeModule } from 'primeng/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [MuproComponent, MuproDetailsComponent, MuproProfilesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MuProRoutingModule,
    // Arpa Lib
    TranslateModule.forChild(['mupro', 'musician-profile']),
    AvatarModule,
    SplitViewModule,
    GraphQlFeedModule,
    // NG Prime Dependencies
    ListboxModule,
    StepsModule,
    RatingModule,
    BadgeModule,
    TabMenuModule,
    InputTextModule,
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
