import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user/user.component';
import { MusicianComponent } from './musician/musician.component';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './resolvers/profile.resolver';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { LanguageService } from '../../core/services/language.service';
import { CommonTranslateModule } from '../../common/translate';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    MyAppointmentsComponent,
    MusicianComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    CommonTranslateModule.forChild(['profile']),
  ],
  providers: [
    ProfileService,
    ProfileResolver,
  ],
})
export class ProfileModule {
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
