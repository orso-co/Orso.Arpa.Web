import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectValuePipe } from './select-value.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SelectValuePipe],
  exports: [SelectValuePipe],
})
export class SelectValueModule {
}
