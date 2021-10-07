import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule as NgxTranslateModule,
  TranslateModuleConfig,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ArpaMissingTranslationHandler } from './missing-translation-handler';
import { TranslationModuleLoader } from './translation-module-loader';

export function httpLoaderFactory(modules: string[]): (http: HttpClient) => TranslationModuleLoader {
  return (http: HttpClient) => new TranslationModuleLoader(http, modules);
}

const defaultConfig = (modules: string[]): TranslateModuleConfig => {
  return {
    loader: {
      provide: TranslateLoader,
      useFactory: httpLoaderFactory(modules),
      deps: [HttpClient],
    },
    useDefaultLang: true,
  };
};

@NgModule({
  exports: [NgxTranslateModule],
})
export class TranslateModule {
  static forRoot(modules: string[] = [], config?: TranslateModuleConfig): ModuleWithProviders<TranslateModule> {
    return NgxTranslateModule.forRoot({
      ...defaultConfig(modules),
      ...config,
    });
  }

  static forChild(modules: string[] = [], config?: TranslateModuleConfig): ModuleWithProviders<TranslateModule> {
    return NgxTranslateModule.forChild({
      ...defaultConfig(modules),
      extend: true,
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: () => new ArpaMissingTranslationHandler(modules),
      },
      ...config,
    });
  }
}
