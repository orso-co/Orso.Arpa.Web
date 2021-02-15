import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';


const MODULES = [InputTextModule, ButtonModule, PasswordModule, MessagesModule, MessageModule, ProgressSpinnerModule, TabMenuModule, InputSwitchModule, CheckboxModule];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
})
export class PrimeNgModule {}
