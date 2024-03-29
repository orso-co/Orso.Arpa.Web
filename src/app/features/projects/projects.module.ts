import { ProjectUrlsComponent } from './project-layout/project-urls/project-urls.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { EditProjectComponent } from './project-layout/edit-project/edit-project.component';
import { ProjectGenreResolver } from './resolvers/project-genre.resolver';
import { ProjectTypeResolver } from './resolvers/project-type.resolver';
import { ProjectParticipationComponent } from './project-participation/project-participation.component';
import { ProjectParticipantsComponent } from './project-layout/project-participants/project-participants.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '../../../@arpa/translate';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageService } from '@arpa/services';
import { GraphQlFeedModule } from '@arpa/components';
import { TableModule } from '@arpa/components';
import { FormFieldModule } from '@arpa/components';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectLayoutComponent } from './project-layout/project-layout.component';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChartModule } from '@arpa/components';
import { ParticipationDialogModule } from '../participation-dialog/participation-dialog.module';
import { ProjectAppointmentsComponent } from './project-layout/project-appointments/project-appointments.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AcceptedParticipantsComponent } from './project-layout/accepted-participants/accepted-participants.component';
import { OverviewLayoutComponent } from './overview-layout/overview-layout.component';
import { PerformerOverviewComponent } from './performer-overview/performer-overview.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    EditProjectComponent,
    ProjectParticipationComponent,
    ProjectParticipantsComponent,
    ProjectLayoutComponent,
    ProjectUrlsComponent,
    ProjectAppointmentsComponent,
    AcceptedParticipantsComponent,
    OverviewLayoutComponent,
    PerformerOverviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,

    // Arpa Lib
    TranslateModule.forChild(['projects', 'mupro']),
    GraphQlFeedModule,
    TableModule,
    FormFieldModule,
    ParticipationDialogModule,

    // NG Prime Dependencies
    DropdownModule,
    ButtonModule,
    CalendarModule,
    InputTextareaModule,
    InputTextModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    TabViewModule,
    TagModule,
    MultiSelectModule,
    OverlayPanelModule,
    ChartModule,
    CheckboxModule,
  ],
  exports: [ProjectListComponent, ProjectAppointmentsComponent],
  providers: [ProjectGenreResolver, ProjectTypeResolver],
})
export class ProjectsModule {
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
