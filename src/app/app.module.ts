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
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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
import { RegisterConfirmationComponent } from './components/onboarding/registerconfirmation/registerconfirmation.component';
import { StaffComponent } from './components/dashboards/staff/staff.component';
import { AdministratorComponent } from './components/dashboards/administrator/administrator.component';
import { TopbarComponent } from './components/shell/topbar/topbar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { WithCredentialsInterceptor } from './interceptors/with-credentials.interceptor';


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
    RegisterConfirmationComponent,
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
