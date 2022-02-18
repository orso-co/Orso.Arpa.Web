import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditProjectUrlsComponent } from './edit-project-urls/edit-project-urls.component';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageService } from '../../../@arpa/services/language.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProjectchartParticipantsComponent } from './projectchart-participants/projectchart-participants.component';
import { ProjectGenreResolver } from './resolvers/project-genre.resolver';
import { ProjectLayoutComponent } from './project-layout/project-layout.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectParticipantsComponent } from './project-participants/project-participants.component';
import { ProjectParticipationComponent } from './project-participation/project-participation.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectTypeResolver } from './resolvers/project-type.resolver';
import { TableModule } from '../../../@arpa/components/table/table.module';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TranslateModule } from '../../../@arpa/translate';
import { TranslateService } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ProjectListComponent,
    EditProjectComponent,
    ProjectParticipationComponent,
    ProjectParticipantsComponent,
    ProjectchartParticipantsComponent,
    ProjectLayoutComponent,
    EditProjectUrlsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    // Arpa Lib
    TranslateModule.forChild(['projects']),
    GraphQlFeedModule,
    TableModule,
    FormFieldModule,
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
