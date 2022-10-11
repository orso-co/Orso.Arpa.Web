import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateBadgeComponent } from './state-badge.component';
import { TranslateModule } from '../../translate';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [StateBadgeComponent],
  imports: [
    CommonModule,
    TranslateModule,
    BadgeModule,
    TagModule,
  ],
  exports: [StateBadgeComponent],
})
export class StateBadgeModule {
}
