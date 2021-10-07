import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectGenreResolver } from './resolvers/project-genre.resolver';
import { ProjectTypeResolver } from './resolvers/project-type.resolver';
import { ProjectStateResolver } from './resolvers/project-status.resolver';
import { ProjectParticipationComponent } from './project-participation/project-participation.component';
import { ProjectParticipantsComponent } from './project-participants/project-participants.component';
import { ProjectchartParticipantsComponent } from './projectchart-participants/projectchart-participants.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '../../../@arpa/translate';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageService } from '../../../@arpa/services/language.service';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { TableModule } from '../../../@arpa/components/table/table.module';

@NgModule({
  declarations: [
    ProjectListComponent,
    EditProjectComponent,
    ProjectParticipationComponent,
    ProjectParticipantsComponent,
    ProjectchartParticipantsComponent,
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
    // NG Prime Dependencies
    DropdownModule,
    ButtonModule,
    CalendarModule,
    InputTextareaModule,
    InputTextModule,
  ],
  exports: [
    ProjectListComponent,
  ],
  providers: [
    ProjectGenreResolver,
    ProjectTypeResolver,
    ProjectStateResolver,
  ],
})
export class ProjectsModule {
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
