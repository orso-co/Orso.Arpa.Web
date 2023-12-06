import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { LayoutModule as AngularLayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { LangSwitchModule } from '@arpa/components';
import { TopbarComponent } from './topbar/topbar.component';
import { MenuModule } from '@arpa/components';
import { AvatarModule } from '@arpa/components';
import { ThemeSwitcherModule } from '@arpa/components';
import { LogoComponent } from './logo/logo.component';
import { LoadingModule } from '@arpa/components';
import { TranslateModule } from '../translate';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [LayoutDefaultComponent, LayoutPageComponent, TopbarComponent, LogoComponent],
  imports: [
    CommonModule,
    AngularLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    TranslateModule,
    LangSwitchModule,
    MenuModule,
    AvatarModule,
    ThemeSwitcherModule,
    LoadingModule,
    ButtonModule,
    ChipModule,
  ],
  exports: [LayoutPageComponent, LogoComponent],
})
export class LayoutModule {}
