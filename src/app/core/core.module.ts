import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorsModule} from './errors/errors.module';
import {ToastrModule} from 'ngx-toastr';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateModuleLoader} from './factories/translate-module-loader';
import {ApiInterceptor} from './interceptors/api.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {ConfigService} from './services/config.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateModuleLoader(http, [
    'default'
  ]);
}

export function translateInitializerFactory(translate: TranslateService, configService: ConfigService) {
  return () => {
    translate.setDefaultLang(configService.getEnv('locale').default);
    return translate.use(configService.getEnv('locale').default).toPromise();
  };
}

@NgModule({
  imports: [
    HttpClientModule,
    ErrorsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-top-full-width'
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: translateInitializerFactory,
      deps: [TranslateService, ConfigService],
      multi: true
    }

  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
