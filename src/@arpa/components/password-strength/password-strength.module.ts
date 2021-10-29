import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordStrengthComponent } from './password-strength.component';
import { TranslateModule } from '../../translate';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [PasswordStrengthComponent],
  exports: [PasswordStrengthComponent],
})
export class PasswordStrengthModule {
}
