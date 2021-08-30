import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonTranslateModule } from '../common/translate';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CommonTranslateModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
})
export class MainModule {
}
