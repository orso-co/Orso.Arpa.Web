import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { InvitationDialogComponent } from './invitation-dialog/invitation-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuproComponent } from './mupro.component';
import { MuProRoutingModule } from './mupro-routing.module';
import { DetailsComponent } from './details/details.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { MuproService } from './services/mupro.service';
import { TranslateService } from '@ngx-translate/core';
import { AvatarModule } from '../../../@arpa/components/avatar/avatar.module';
import { LanguageService } from '@arpa/services';
import { TranslateModule } from '../../../@arpa/translate';
import { SplitViewModule } from '../../../@arpa/components/split-view/split-view.module';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { StepsModule } from 'primeng/steps';
import { RatingModule } from 'primeng/rating';
import { BadgeModule } from 'primeng/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from '../../../@arpa/components/table/table.module';
import { ProjectsComponent } from './projects/projects.component';
import { ParticipationDialogModule } from '../participation-dialog/participation-dialog.module';
import { TabViewModule } from 'primeng/tabview';
import { AppointmentsComponent } from './appointments/appointments.component';

@NgModule({
  declarations: [
    MuproComponent,
    DetailsComponent,
    ProfilesComponent,
    ProjectsComponent,
    InvitationDialogComponent,
    AppointmentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MuProRoutingModule,

    // Arpa Lib
    TranslateModule.forChild(['mupro', 'mupro']),
    AvatarModule,
    SplitViewModule,
    GraphQlFeedModule,
    TableModule,
    FormFieldModule,
    ParticipationDialogModule,

    // NG Prime Dependencies
    ListboxModule,
    StepsModule,
    RatingModule,
    BadgeModule,
    TabMenuModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    TabViewModule,
  ],
  providers: [MuproService],
})
export class MuProModule {
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
