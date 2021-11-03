import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateBadgeComponent } from './state-badge.component';
import { TranslateModule } from '../../translate';
import { BadgeModule } from 'primeng/badge';


@NgModule({
  declarations: [StateBadgeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    BadgeModule,
  ],
  exports: [StateBadgeComponent],
})
export class StateBadgeModule {
}
