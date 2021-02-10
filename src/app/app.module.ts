import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    ProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
