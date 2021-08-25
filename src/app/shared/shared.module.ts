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
import { DummyComponent } from './dummy/dummy.component';
import { AvatarComponent } from './avatar/avatar.component';
import { MenuComponent } from './menu/menu.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { AuditDialogDirective } from './audit-log/audit-dialog.directive';
import { AuditDialogComponent } from './audit-dialog/audit-dialog.component';
import { SplitViewComponent } from './split-view/split-view.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { CloseButtonDirective } from './directives/close-button.directive';
import { SelectValuePipe } from './pipes/select-value.pipe';
import { SelectDialogModule } from './select-dialog/select-dialog.module';
import { CommonTranslateModule } from '../common/translate';

@NgModule({
  declarations: [
    LoadingComponent,
    LangSwitchComponent,
    LogoComponent,
    BackButtonDirective,
    TopbarComponent,
    DummyComponent,
    AvatarComponent,
    MenuComponent,
    AuditLogComponent,
    AuditDialogDirective,
    AuditDialogComponent,
    SplitViewComponent,
    FormFieldComponent,
    PasswordStrengthComponent,
    CloseButtonDirective,
    SelectValuePipe,
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    CommonTranslateModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SelectDialogModule,
  ],
  exports: [
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    ProgressSpinnerModule,
    LangSwitchComponent,
    LogoComponent,
    BackButtonDirective,
    TopbarComponent,
    DummyComponent,
    AvatarComponent,
    MenuComponent,
    AuditDialogDirective,
    SplitViewComponent,
    FormFieldComponent,
    PasswordStrengthComponent,
    SelectValuePipe,
    SelectDialogModule,
  ],
})
export class SharedModule {
}
