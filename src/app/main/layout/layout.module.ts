import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutDefaultComponent} from './layout-default/layout-default.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {LayoutModule as AngularLayoutModule} from '@angular/cdk/layout';
import {RouterModule} from "@angular/router";
import {LayoutPageComponent} from './layout-page/layout-page.component';
import {SharedModule} from "../../shared/shared.module";
import { CommonTranslateModule } from '../../common/translate';


@NgModule({
  declarations: [
    LayoutDefaultComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    AngularLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    SharedModule,
    CommonTranslateModule,
  ]
})
export class LayoutModule {
}
