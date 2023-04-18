import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParticipationDialogComponent } from './participation-dialog.component';
import { ParticipationEditComponent } from './participation-edit/participation-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../../../@arpa/layout/layout.module';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { TabViewModule } from 'primeng/tabview';
import { AppointmentParticipationsComponent } from './appointment-participations/appointment-participations.component';
import { TableModule } from '../../../@arpa/components/table/table.module';
import { LocalizedDateModule } from '../../../@arpa/pipes/localized-date/localized-date.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LayoutModule,
    ListboxModule,
    StepsModule,
    RatingModule,
    BadgeModule,
    TabMenuModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    FormFieldModule,
    TabViewModule,
    TableModule,
    LocalizedDateModule,
  ],
  declarations: [ParticipationDialogComponent, ParticipationEditComponent, AppointmentParticipationsComponent],
  exports: [ParticipationDialogComponent, AppointmentParticipationsComponent],
})
export class ParticipationDialogModule {}
