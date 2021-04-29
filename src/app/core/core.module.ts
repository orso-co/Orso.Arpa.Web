import { APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateModuleLoader } from './factories/translate-module-loader';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { ConfigService } from './services/config.service';
import { ErrorHandler as CustomErrorHandler } from './error-handler';
import { HttpLoaderInterceptor } from './interceptors/http-loader-interceptor.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export const httpLoaderFactory = (http: HttpClient) => new TranslateModuleLoader(http, [
  'default',
]);

export const translateInitializerFactory = (translate: TranslateService, configService: ConfigService) => () => {
  translate.setDefaultLang(configService.getEnv('locale').default);
  return translate.use(configService.getEnv('locale').default).toPromise();
};

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true },
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: translateInitializerFactory,
      deps: [TranslateService, ConfigService],
      multi: true,
    },

  ],
  exports: [
    ToastModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        MessageService,
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
