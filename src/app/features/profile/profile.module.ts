import { AccordionModule } from 'primeng/accordion';
import { AvatarModule as PrimeNGAvatarModule } from 'primeng/avatar';
import { AvatarModule } from '@arpa/components';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormFieldModule } from '@arpa/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQlFeedModule } from '@arpa/components';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageService } from '@arpa/services';
import { LocalizedDateModule } from '../../../@arpa/pipes/localized-date/localized-date.module';
import { LocalizedDatePipe } from '../../../@arpa/pipes/localized-date/localized-date.pipe';
import { MenuModule } from '@arpa/components';
import { MessageModule } from 'primeng/message';
import { MusicianprofileComponent } from './musicianprofile/musicianprofile.component';
import { MyAppointmentParticipationDialogComponent } from './my-appointment-participation-dialog/my-appointment-participation-dialog.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { MyProjectParticipationDialogComponent } from './my-projects/my-project-participation-dialog/my-project-participation-dialog.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ParticipationDialogModule } from '../participation-dialog/participation-dialog.module';
import { ProfileComponent } from './profile.component';
import { ProfilePictureModule } from '@arpa/components';
import { ProfileResolver } from './resolvers/profile.resolver';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './profile.service';
import { ProjectsModule } from '../projects/projects.module';
import { QRCodeComponent } from './qrcode/qrcode.component';
import { RatingModule } from 'primeng/rating';
import { RibbonComponent } from '../../shared/components/ribbon/ribbon.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectDialogModule } from './select-dialog/select-dialog.module';
import { SelectValueModule } from '../../../@arpa/pipes/select-value/select-value.module';
import { SplitViewModule } from '@arpa/components';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'src/@arpa/components/table/table.module';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '../../../@arpa/translate';
import { TranslateService } from '@ngx-translate/core';
import { UserBankdataComponent } from './my-data/user-bankdata/user-bankdata.component';
import { UserBasedataComponent } from './my-data/user-basedata/user-basedata.component';
import { UserContactdataComponent } from './my-data/user-contactdata/user-contactdata.component';
import { MyDataComponent } from './my-data/my-data.component';
import { UserAddressdataComponent } from './my-data/user-addressdata/user-addressdata.component';

@NgModule({
  declarations: [
    ProfileComponent,
    MyDataComponent,
    MyAppointmentsComponent,
    MusicianprofileComponent,
    QRCodeComponent,
    MyProjectsComponent,
    MyProjectParticipationDialogComponent,
    MyDataComponent,
    UserBasedataComponent,
    UserContactdataComponent,
    UserBankdataComponent,
    RibbonComponent,
    MyAppointmentParticipationDialogComponent,
    UserAddressdataComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDialogModule,
    ProfilePictureModule,
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
    AvatarModule,
    FileUploadModule,
    PrimeNGAvatarModule,
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
