import { EditProjectUrlsComponent } from './edit-project-urls/edit-project-urls.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectGenreResolver } from './resolvers/project-genre.resolver';
import { ProjectTypeResolver } from './resolvers/project-type.resolver';
import { ProjectParticipationComponent } from './project-participation/project-participation.component';
import { ProjectParticipantsComponent } from './project-participants/project-participants.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '../../../@arpa/translate';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageService } from '@arpa/services';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { TableModule } from '../../../@arpa/components/table/table.module';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectLayoutComponent } from './project-layout/project-layout.component';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChartModule } from '../../../@arpa/components/chart/chart.module';
import { ParticipationDialogModule } from '../../../@arpa/components/participation-dialog/participation-dialog.module';
import { ProjectAppointmentsComponent } from './project-appointments/project-appointments.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    EditProjectComponent,
    ProjectParticipationComponent,
    ProjectParticipantsComponent,
    ProjectLayoutComponent,
    EditProjectUrlsComponent,
    ProjectAppointmentsComponent,
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
  ],
  exports: [ProjectListComponent],
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
