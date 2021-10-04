import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LayoutModule as AngularLayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { LangSwitchModule } from '../components/lang-switch/lang-switch.module';
import { TopbarComponent } from './topbar/topbar.component';
import { MenuModule } from '../components/menu/menu.module';
import { AvatarModule } from '../components/avatar/avatar.module';
import { ThemeSwitcherModule } from '../components/theme-switcher/theme-switcher.module';
import { LogoComponent } from './logo/logo.component';
import { LoadingModule } from '../components/loading/loading.module';
import { TranslateModule } from '../translate';


@NgModule({
  declarations: [
    LayoutDefaultComponent,
    LayoutPageComponent,
    TopbarComponent,
    LogoComponent,
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
    TranslateModule,
    LangSwitchModule,
    MenuModule,
    AvatarModule,
    ThemeSwitcherModule,
    LoadingModule,
  ],
})
export class LayoutModule {
}
