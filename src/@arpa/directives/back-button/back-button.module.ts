import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackButtonDirective } from './back-button.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [BackButtonDirective],
  exports: [BackButtonDirective],
})
export class BackButtonModule {
}
