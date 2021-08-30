import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
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
    useDefaultLang: false,
  };
};

@NgModule({
  exports: [TranslateModule],
})
export class CommonTranslateModule {
  static forRoot(modules: string[] = [], config?: TranslateModuleConfig): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot({
      ...defaultConfig(modules),
      ...config,
    });
  }

  static forChild(modules: string[] = [], config?: TranslateModuleConfig): ModuleWithProviders<TranslateModule> {
    const module = TranslateModule.forChild({
      ...defaultConfig(modules),
      extend: true,
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: ArpaMissingTranslationHandler,
      },
      ...config,
    });

    return module;
  }
}
