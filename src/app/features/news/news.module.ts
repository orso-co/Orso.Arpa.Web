import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'src/@arpa/translate/';
import { TranslateService } from 'src/@arpa/translate';
import { LanguageService } from '@arpa/services';
import { TableModule } from '../../../@arpa/components/table/table.module';
import { NewsComponent } from './news.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../../@arpa/services/news.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { LocalizedDateModule } from '../../../@arpa/pipes/localized-date/localized-date.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewsComponent,
        resolve: {
          news: NewsService,
        },
      },
    ]),
    // Arpa Lib
    TranslateModule.forChild(['news']),
    TableModule,
    // NG Prime Dependencies
    DropdownModule,
    ButtonModule,
    ConfirmPopupModule,
    FormFieldModule,
    InputTextModule,
    ListboxModule,
    ReactiveFormsModule,
    FormsModule,
    InputSwitchModule,
    RippleModule,
    ToggleButtonModule,
    LocalizedDateModule,
  ],
  declarations: [NewsComponent],
  providers: [],
})
export class NewsModule {
  constructor(private translateService: TranslateService, private languageService: LanguageService) {
    languageService.languageEvent.subscribe((lang) => {
      /**
       * Reset lang for lazy module.
       * Fixes: https://github.com/ngx-translate/core/issues/1193
       */
      translateService.currentLang = '';
      translateService.use(lang);
    });
  }
}
