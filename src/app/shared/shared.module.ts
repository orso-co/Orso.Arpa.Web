import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LangSwitchComponent } from './lang-switch/lang-switch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { LogoComponent } from './logo/logo.component';
import { BackButtonDirective } from './directives/back-button.directive';
import { TopbarComponent } from './topbar/topbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { DummyComponent } from './dummy/dummy.component';

@NgModule({
  declarations: [
    LoadingComponent,
    LangSwitchComponent,
    LogoComponent,
    BackButtonDirective,
    TopbarComponent,
    DummyComponent,
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
  exports: [
    PrimeNgModule,
    LoadingComponent,
    ProgressSpinnerModule,
    LangSwitchComponent,
    LogoComponent,
    BackButtonDirective,
    TopbarComponent,
    DummyComponent,
  ],
})
export class SharedModule {
}
