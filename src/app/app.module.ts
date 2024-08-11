import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ArpaModule } from '../@arpa/arpa.module';
import { ThemeSwitcherService } from '../@arpa/components/theme-switcher/theme-switcher.service';
import { ConfigService } from '@arpa/services';
import { OfflineComponent } from './shared/components/offline/offline.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [AppComponent, OfflineComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ChartModule,

    ArpaModule.forRoot(),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
    TranslateModule,
    MatIconModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfigService: ConfigService) => () => appConfigService.fetch(),
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private themeService: ThemeSwitcherService, private iconRegistry: MatIconRegistry) {
    themeService.setTheme();
    iconRegistry.registerFontClassAlias('icomoon', '');
  }
}
