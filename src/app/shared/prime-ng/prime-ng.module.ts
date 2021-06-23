import { Skeleton, SkeletonModule } from 'primeng/skeleton';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
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
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { CaptchaModule } from 'primeng/captcha';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';

const MODULES = [
  InputTextModule,
  ButtonModule,
  PasswordModule,
  MessageModule,
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
  DropdownModule,
  FieldsetModule,
  PanelModule,
  InputNumberModule,
  ConfirmDialogModule,
  CaptchaModule,
  StepsModule,
  CalendarModule,
  AutoCompleteModule,
  TableModule,
  SidebarModule,
  ToolbarModule,
  AccordionModule,
  RatingModule,
  PaginatorModule,
  MultiSelectModule,
  InputTextareaModule,
  BadgeModule,
  SkeletonModule
];

@NgModule({
  imports: [CommonModule, ...MODULES],
  providers: [ConfirmationService, DialogService],
  exports: [...MODULES],
})
export class PrimeNgModule {
}
