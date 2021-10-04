import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormFieldComponent } from './form-field.component';
import { TranslateModule } from '../../translate';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [FormFieldComponent],
  exports: [FormFieldComponent],
})
export class FormFieldModule {
}
