import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ArpaWidgetConfigDirective, DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { WidgetComponent } from './widget/widget.component';
import { UserWidgetComponent } from './user-widget/user-widget.component';
import { MessagesWidgetComponent } from './messages-widget/messages-widget.component';
import { AppointmentsWidgetComponent } from './appointments-widget/appointments-widget.component';
import { TasksWidgetComponent } from './tasks-widget/tasks-widget.component';
import { ProjectsWidgetComponent } from './projects-widget/projects-widget.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state/state';
import { ChoirGridWidgetComponent } from './choir-grid-widget/choir-grid-widget.component';
import { ChartModule } from '../../../@arpa/components/chart/chart.module';
import { AvatarModule } from '../../../@arpa/components/avatar/avatar.module';
import { TranslateModule } from '../../../@arpa/translate';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingModule } from '../../../@arpa/components/loading/loading.module';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../@arpa/services/language.service';
import { StateBadgeModule } from '../../../@arpa/components/status-badge/state-badge.module';


@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent,
    UserWidgetComponent,
    MessagesWidgetComponent,
    AppointmentsWidgetComponent,
    TasksWidgetComponent,
    ProjectsWidgetComponent,
    ChartWidgetComponent,
    ArpaWidgetConfigDirective,
    ChoirGridWidgetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', reducers),
    // Arpa Lib
    TranslateModule.forChild(['dashboard']),
    AvatarModule,
    ChartModule,
    StateBadgeModule,
    LoadingModule,
    // NG Material Dependencies
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    // NG Prime Dependencies
    ConfirmPopupModule,
    CheckboxModule,
    SkeletonModule,
    TableModule,
    OverlayPanelModule,
    CardModule,
    ButtonModule,
    BadgeModule,
    DropdownModule,
    AccordionModule,
    TabMenuModule,
    InputTextModule,
  ],
})
export class DashboardModule {
  constructor(private translateService: TranslateService, private languageService: LanguageService) {
    languageService.languageEvent.subscribe(lang => {
      /**
       * Reset lang for lazy module.
       * Fixes: https://github.com/ngx-translate/core/issues/1193
       */
      translateService.currentLang = '';
      translateService.use(lang);
    });
  }
}
