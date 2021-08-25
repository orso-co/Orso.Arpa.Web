import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CommonTranslateModule } from '../../common/translate';

@NgModule({
  declarations: [
    PageLayoutComponent,
    PageHeaderComponent,
    DefaultLayoutComponent,
    DefaultHeaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CommonTranslateModule,
    SharedModule,
  ],
})
export class LayoutModule {
}
