import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { StaffComponent } from './staff/staff.component';
import { PerformerComponent } from './performer/performer.component';
import { NoRoleComponent } from './no-role/no-role.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { ProjectsModule } from '../projects/projects.module';
import { UserchartComponent } from './userchart/userchart.component';
import { ProjectgenrechartComponent } from './projectgenrechart/projectgenrechart.component';
import { TestchildComponent } from './testchild/testchild.component';
import { ChoirGridComponent } from './choir-grid/choir-grid.component';
import { CommonTranslateModule } from '../../common/translate';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@NgModule({
  declarations: [
    UserListComponent,
    StaffComponent,
    PerformerComponent,
    NoRoleComponent,
    DashboardComponent,
    AdministratorComponent,
    UserchartComponent,
    ProjectgenrechartComponent,
    TestchildComponent,
    ChoirGridComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    ProjectsModule,
    CommonTranslateModule.forChild(['dashboard']),
  ],
})
export class DashboardsModule {
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
