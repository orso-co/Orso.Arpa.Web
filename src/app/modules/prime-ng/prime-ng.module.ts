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
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';
import { MenuModule } from 'primeng/menu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { SpinnerModule } from 'primeng/spinner';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import {CaptchaModule} from 'primeng/captcha';
import {SidebarModule} from 'primeng/sidebar';

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
  CheckboxModule,
  TreeModule,
  MenuModule,
  SelectButtonModule,
  DataViewModule,
  SpinnerModule,
  DropdownModule,
  FieldsetModule,
  PanelModule,
  InputNumberModule,
  FullCalendarModule,
  ConfirmDialogModule,
  DynamicDialogModule,
  CaptchaModule,
  StepsModule,
  CalendarModule,
  AutoCompleteModule,
  TableModule,
  SidebarModule
];

@NgModule({
  imports: [CommonModule, ...MODULES],
  providers: [ConfirmationService, DialogService],
  exports: [...MODULES],
})
export class PrimeNgModule {}
