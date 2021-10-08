import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicianDialogEntryComponent } from './musician-dialog-entry/musician-dialog-entry.component';
import { MusicianRoutingModule } from './musician-routing.module';
import { MusicianLayoutComponent } from './musician-layout/musician-layout.component';
import { MusicianDocumentsComponent } from './musician-documents/musician-documents.component';
import { MusicianEducationComponent } from './musician-education/musician-education.component';
import { MusicianDoublingInstrumentComponent } from './musician-doubling-instrument/musician-doubling-instrument.component';
import { MusicianMainInstrumentComponent } from './musician-main-instrument/musician-main-instrument.component';
import { MusicianDeactivationComponent } from './musician-deactivation/musician-deactivation.component';
import { MusicianInstrumentsComponent } from './musician-instruments/musician-instruments.component';
import { AccordionModule } from 'primeng/accordion';
import { InstrumentPartsPipe } from './pipes/instrument-parts.pipe';
import { SectionPipe } from './pipes/section.pipe';
import { TranslateModule } from '../../../@arpa/translate';
import { SelectValueModule } from '../../../@arpa/pipes/select-value/select-value.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../@arpa/services/language.service';

@NgModule({
  declarations: [
    MusicianDialogEntryComponent,
    MusicianLayoutComponent,
    MusicianDocumentsComponent,
    MusicianEducationComponent,
    MusicianDoublingInstrumentComponent,
    MusicianMainInstrumentComponent,
    MusicianDeactivationComponent,
    MusicianInstrumentsComponent,
    InstrumentPartsPipe,
    SectionPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MusicianRoutingModule,
    // Arpa Lib
    TranslateModule.forChild(['musician-profile']),
    SelectValueModule,
    FormFieldModule,
    // NG Prime Dependencies
    AccordionModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule,
    RatingModule,
    PanelModule,
    ButtonModule,
    TooltipModule,
    TabViewModule,
    TableModule,
    CalendarModule,
    InputTextModule,
  ],
})
export class MusicianProfileModule {
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
