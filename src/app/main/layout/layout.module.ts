import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PageLayoutComponent,
    PageHeaderComponent,
    DefaultLayoutComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule,
    SharedModule,
  ],
})
export class LayoutModule {
}
