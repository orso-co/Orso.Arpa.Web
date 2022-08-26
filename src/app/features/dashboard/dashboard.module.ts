import { LocalizedDateModule } from './../../../@arpa/pipes/localized-date/localized-date.module';
import { AccordionModule } from 'primeng/accordion';
import { AppointmentsWidgetComponent } from './appointments-widget/appointments-widget.component';
import { ArpaWidgetConfigDirective, DashboardComponent } from './dashboard.component';
import { AvatarModule } from '../../../@arpa/components/avatar/avatar.module';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from '../../../@arpa/components/chart/chart.module';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ChoirGridWidgetComponent } from './choir-grid-widget/choir-grid-widget.component';
import { CommonModule } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormFieldModule } from './../../../@arpa/components/form-field/form-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQlFeedComponent } from 'src/@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { GraphQlFeedModule } from './../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { IframeWidgetComponent } from './iframe-widget/iframe-widget.component';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageService } from '../../../@arpa/services/language.service';
import { LayoutModule } from '@angular/cdk/layout';
import { LoadingModule } from '../../../@arpa/components/loading/loading.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MessagesWidgetComponent } from './messages-widget/messages-widget.component';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProjectsRoutingModule } from './../projects/projects-routing.module';
import { ProjectsWidgetComponent } from './projects-widget/projects-widget.component';
import { reducers } from './state/state';
import { SelectDialogModule } from './../profile/select-dialog/select-dialog.module';
import { SelectValueModule } from '../../../@arpa/pipes/select-value/select-value.module';
import { SkeletonModule } from 'primeng/skeleton';
import { StateBadgeModule } from '../../../@arpa/components/status-badge/state-badge.module';
import { StoreModule } from '@ngrx/store';
import { TableModule } from '../../../@arpa/components/table/table.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TasksWidgetComponent } from './tasks-widget/tasks-widget.component';
import { TranslateModule } from '../../../@arpa/translate';
import { TranslateService } from '@ngx-translate/core';
import { UserWidgetComponent } from './user-widget/user-widget.component';
import { WidgetComponent } from './widget/widget.component';
import { ChipModule } from 'primeng/chip';
import { MessageModule } from 'primeng/message';
import { IframeWidgetProjectstatsComponent } from './iframe-widget-projectstats/iframe-widget-projectstats.component';

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
    ChoirGridWidgetComponent,
    IframeWidgetComponent,
    IframeWidgetProjectstatsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', reducers),
    ProjectsRoutingModule,
    SelectDialogModule,

    // Arpa Lib
    TranslateModule.forChild(['dashboard']),
    AvatarModule,
    ChartModule,
    StateBadgeModule,
    LoadingModule,
    TableModule,
    GraphQlFeedModule,
    SelectDialogModule,
    SelectValueModule,

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
    TagModule,
    TabViewModule,
    LocalizedDateModule,
    ChipModule,
    MessageModule,
  ],
  exports: [
    ProjectsWidgetComponent,
  ],
})
export class DashboardModule {
  constructor(private translateService: TranslateService, private languageService: LanguageService) {
    languageService.languageEvent.subscribe((lang) => {
      /**
       * Reset lang for lazy module.
       * Fixes: https://github.com/ngx-translate/core/issues/1193
       */
      translateService.currentLang = '';
      translateService.use(lang);
    });
  }
}
