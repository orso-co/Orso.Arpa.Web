import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicianDialogEntryComponent } from './musician-dialog-entry/musician-dialog-entry.component';
import { MusicianRoutingModule } from './musician-routing.module';
import { MusicianLayoutComponent } from './musician-layout/musician-layout.component';
import { MusicianDocumentsComponent } from './musician-documents/musician-documents.component';
import { MusicianEducationComponent } from './musician-education/musician-education.component';
import { MusicianDoublingInstrumentComponent } from './musician-doubling-instrument/musician-doubling-instrument.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MusicianMainInstrumentComponent } from './musician-main-instrument/musician-main-instrument.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModuleLoader } from '../../core/factories/translate-module-loader';
import { MusicianDeactivationComponent } from './musician-deactivation/musician-deactivation.component';
import { MusicianInstrumentsComponent } from './musician-instruments/musician-instruments.component';
import { AccordionModule } from 'primeng/accordion';
import { InstrumentPartsPipe } from './pipes/instrument-parts.pipe';

export const HttpLoaderFactory = (http: HttpClient) => new TranslateModuleLoader(http, ['musician-profile']);

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
  ],
  imports: [
    CommonModule,
    MusicianRoutingModule,
    AccordionModule,
    SharedModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class MusicianProfileModule {
  constructor(private translateService: TranslateService) {
    const currentLang = translateService.currentLang;
    translateService.currentLang = '';
    translateService.use(currentLang);
  }
}
