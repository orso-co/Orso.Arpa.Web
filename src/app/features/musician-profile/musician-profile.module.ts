import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicianDialogEntryComponent } from './musician-dialog-entry/musician-dialog-entry.component';
import { MusicianRoutingModule } from './musician-routing.module';
import { MusicianLayoutComponent } from './musician-layout/musician-layout.component';
import { MusicianDocumentsComponent } from './musician-documents/musician-documents.component';
import { MusicianEducationComponent } from './musician-education/musician-education.component';
import { MusicianDoublingInstrumentComponent } from './musician-doubling-instrument/musician-doubling-instrument.component';
import { SharedModule } from '../../shared/shared.module';
import { MusicianMainInstrumentComponent } from './musician-main-instrument/musician-main-instrument.component';
import { MusicianDeactivationComponent } from './musician-deactivation/musician-deactivation.component';
import { MusicianInstrumentsComponent } from './musician-instruments/musician-instruments.component';
import { AccordionModule } from 'primeng/accordion';
import { InstrumentPartsPipe } from './pipes/instrument-parts.pipe';
import { CommonTranslateModule } from '../../common/translate';
import { SectionPipe } from './pipes/section.pipe';

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
    MusicianRoutingModule,
    AccordionModule,
    SharedModule,
    CommonTranslateModule.forChild(['musician-profile']),
  ],
})
export class MusicianProfileModule {
}
