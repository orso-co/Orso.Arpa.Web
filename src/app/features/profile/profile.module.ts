import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RibbonComponent } from '../../shared/components/ribbon/ribbon.component';
import { AccordionModule } from 'primeng/accordion';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AvatarModule } from '../../../@arpa/components/avatar/avatar.module';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormFieldModule } from '../../../@arpa/components/form-field/form-field.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQlFeedModule } from '../../../@arpa/components/graph-ql-feed/graph-ql-feed.module';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageService } from '@arpa/services';
import { LocalizedDateModule } from '../../../@arpa/pipes/localized-date/localized-date.module';
import { LocalizedDatePipe } from '../../../@arpa/pipes/localized-date/localized-date.pipe';
import { MenuModule } from '../../../@arpa/components/menu/menu.module';
import { MessageModule } from 'primeng/message';
import { MusicianComponent } from './musician/musician.component';
import { MyProjectParticipationDialogComponent } from './my-project-participation-dialog/my-project-participation-dialog.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './resolvers/profile.resolver';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './profile.service';
import { QRCodeComponent } from './qrcode/qrcode.component';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectDialogModule } from './select-dialog/select-dialog.module';
import { SelectValueModule } from '../../../@arpa/pipes/select-value/select-value.module';
import { SplitViewModule } from '../../../@arpa/components/split-view/split-view.module';
import { TableModule } from 'src/@arpa/components/table/table.module';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TranslateModule } from '../../../@arpa/translate';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent } from './user/user.component';
import { UserContactDataComponent } from './user-contact-data/user-contact-data.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserBankdataComponent } from './user-bankdata/user-bankdata.component';
import { ChipModule } from 'primeng/chip';
import { MyAppointmentParticipationDialogComponent } from './my-appointment-participation-dialog/my-appointment-participation-dialog.component';
import { ProjectsModule } from '../projects/projects.module';
import { ParticipationDialogModule } from '../participation-dialog/participation-dialog.module';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    AppointmentsComponent,
    MusicianComponent,
    QRCodeComponent,
    MyProjectsComponent,
    MyProjectParticipationDialogComponent,
    UserDataComponent,
    UserContactDataComponent,
    UserBankdataComponent,
    RibbonComponent,
    MyAppointmentParticipationDialogComponent,
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
    TableModule,
    // PrimeNG Dependencies
    ButtonModule,
    DropdownModule,
    BadgeModule,
    InputTextModule,
    GraphQlFeedModule,
    LocalizedDateModule,
    AccordionModule,
    TagModule,
    TabViewModule,
    MessageModule,
    CalendarModule,
    SelectButtonModule,
    RatingModule,
    ChipModule,
    OverlayPanelModule,
    ProjectsModule,
    ParticipationDialogModule,
    TooltipModule,
  ],
  providers: [ProfileService, ProfileResolver, LocalizedDatePipe],
  exports: [RibbonComponent],
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
