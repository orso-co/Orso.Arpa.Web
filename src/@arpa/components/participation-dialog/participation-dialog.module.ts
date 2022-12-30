import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParticipationDialogComponent } from './components/participation-dialog/participation-dialog.component';
import { ParticipationEditComponent } from './components/participation-edit/participation-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../../layout/layout.module';
import { ListboxModule } from 'primeng/listbox';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { FormFieldModule } from '../form-field/form-field.module';
import { TabViewModule } from 'primeng/tabview';

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
  ],
  declarations: [
    ParticipationDialogComponent,
    ParticipationEditComponent
  ],
  exports: [ParticipationDialogComponent],
})
export class ParticipationDialogModule {
}
