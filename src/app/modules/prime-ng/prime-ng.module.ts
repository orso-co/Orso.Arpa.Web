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
  OverlayPanelModule
];

@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
})
export class PrimeNgModule {}
