import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormFieldModule } from './../../../@arpa/components/form-field/form-field.module';
import { VenueService } from '@arpa/services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenuesComponent } from './venues.component';
import { RouterModule } from '@angular/router';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '../../../@arpa/translate';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: VenuesComponent,
        resolve: {
          venues: VenueService,
        },
      },
    ]),
    ListboxModule,
    ButtonModule,
    InputTextModule,
    ConfirmPopupModule,
    TranslateModule.forChild(['venues']),
    FormFieldModule,
  ],
  declarations: [VenuesComponent],
  providers: [],
})
export class VenuesModule {}
