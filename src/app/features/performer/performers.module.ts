import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'src/@arpa/translate/';
import { TranslateService } from 'src/@arpa/translate';
import { PerformersRoutingModule } from './performers-routing.module';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { LanguageService } from '../../../@arpa/services/language.service';
import { TableModule } from '../../../@arpa/components/table/table.module';
import { PerformerListComponent } from './performer-list/performer-list.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
@NgModule({
  declarations: [
    PerformerListComponent,
  ],
  imports: [
    PerformersRoutingModule,
    CommonModule,
    // Arpa Lib
    TranslateModule.forChild(['persons']),
    GraphQlFeedModule,
    TableModule,
    // NG Prime Dependencies
    DropdownModule,
    ButtonModule,
    OverlayPanelModule
  ],
  exports: [
    PerformerListComponent,
  ],

})
export class PerformersModule {
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
