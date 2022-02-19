import { MyProjectParticipationDialogComponent } from './my-project-participation-dialog/my-project-participation-dialog.component';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent } from './user/user.component';
import { MusicianComponent } from './musician/musician.component';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './resolvers/profile.resolver';
import { AppointmentsComponent } from './appointments/appointments.component';
import { LanguageService } from '../../../@arpa/services/language.service';
import { MenuModule } from '../../../@arpa/components/menu/menu.module';
import { AvatarModule } from '../../../@arpa/components/avatar/avatar.module';
import { TranslateModule } from '../../../@arpa/translate';
import { SelectValueModule } from '../../../@arpa/pipes/select-value/select-value.module';
import { SplitViewModule } from '../../../@arpa/components/split-view/split-view.module';
import { SelectDialogModule } from './select-dialog/select-dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { QRCodeComponent } from './qrcode/qrcode.component';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { LocalizedDateModule } from '../../../@arpa/pipes/localized-date/localized-date.module';
import { LocalizedDatePipe } from '../../../@arpa/pipes/localized-date/localized-date.pipe';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    AppointmentsComponent,
    MusicianComponent,
    QRCodeComponent,
    MyProjectsComponent,
    MyProjectParticipationDialogComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDialogModule,
    // Arpa Lib
    TranslateModule.forChild(['profile']),
    MenuModule,
    AvatarModule,
    SplitViewModule,
    SelectValueModule,
    FormFieldModule,
    // NG Prime Dependencies
    ButtonModule,
    DropdownModule,
    BadgeModule,
    TableModule,
    InputTextModule,
    GraphQlFeedModule,
    LocalizedDateModule,
    AccordionModule,
    TagModule,
    TabViewModule,
  ],
  providers: [ProfileService, ProfileResolver, LocalizedDatePipe],
})
export class ProfileModule {
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
