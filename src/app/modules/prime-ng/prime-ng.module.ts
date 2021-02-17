import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { ListboxModule } from 'primeng/listbox';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';

const MODULES = [
  InputTextModule,
  ButtonModule,
  PasswordModule,
  MessagesModule,
  MessageModule,
  ProgressSpinnerModule,
  TabMenuModule,
  ListboxModule,
  AvatarModule,
  CardModule,
  OverlayPanelModule,
  TooltipModule,
  ConfirmPopupModule,
  CheckboxModule
];

@NgModule({
  imports: [CommonModule, ...MODULES],
  providers: [ConfirmationService],
  exports: [...MODULES],
})
export class PrimeNgModule {}
