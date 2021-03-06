import { LogoutComponent } from './components/onboarding/logout/logout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UserListComponent } from './components/dashboards/user-list/user-list.component';
import { environment } from './../environments/environment';
import { LOCAL_STORAGE_TOKEN_KEY } from './services/auth.service';
import { PrimeNgModule } from './modules/prime-ng/prime-ng.module';
import { NoRoleComponent } from './components/dashboards/no-role/no-role.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { FooterComponent } from './components/shell/footer/footer.component';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { OnboardingShellComponent } from './components/onboarding/onboarding-shell/onboarding-shell.component';
import { MainComponent } from './components/shell/main/main.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { ArpalogoComponent } from './components/arpalogo/arpalogo.component';
import { LoginComponent } from './components/onboarding/login/login.component';
import { RegisterComponent } from './components/onboarding/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { PerformerComponent } from './components/dashboards/performer/performer.component';
import { EmailconfirmationComponent } from './components/onboarding/emailconfirmation/emailconfirmation.component';
import { StaffComponent } from './components/dashboards/staff/staff.component';
import { AdministratorComponent } from './components/dashboards/administrator/administrator.component';
import { TopbarComponent } from './components/shell/topbar/topbar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';
import { API_URL } from './models/api-url';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ForgotPasswordComponent } from './components/onboarding/forgot-password/forgot-password.component';
import { LanguageMenuComponent } from './components/language-menu/language-menu.component';
import { ProfileComponent } from './components/onboarding/profile/profile.component';

registerLocaleData(localeDe, 'de');

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

export function tokenGetter(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    ArpalogoComponent,
    LoginComponent,
    RegisterComponent,
    PerformerComponent,
    EmailconfirmationComponent,
    StaffComponent,
    AdministratorComponent,
    MainComponent,
    TopbarComponent,
    OnboardingShellComponent,
    DashboardComponent,
    FooterComponent,
    ForbiddenComponent,
    NotFoundComponent,
    NoRoleComponent,
    UserListComponent,
    LoadingComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    LanguageMenuComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CheckboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    PrimeNgModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.api.baseUrl],
        disallowedRoutes: [],
      },
    }),
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-top-full-width'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    { provide: API_URL, useValue: `${environment.api.protocol}://${environment.api.baseUrl}` },
    { provide: LOCALE_ID, useValue: 'de-de' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
