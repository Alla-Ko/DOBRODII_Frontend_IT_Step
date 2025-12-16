import { registerLocaleData } from '@angular/common';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import localeUk from '@angular/common/locales/uk';
import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { routes } from './app.routes';
import { translateLoaderFactory } from './core/i18n/translate-loader.factory';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { MetaSsrService } from './core/services/meta-ssr.service';
registerLocaleData(localeUk);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: LOCALE_ID, useValue: 'uk-UA' },

    //provideHttpClient(),
    provideHttpClient(withInterceptors([httpInterceptor])),

    // 👇 Підключаємо TranslateModule через importProvidersFrom
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'uk',
        loader: {
          provide: TranslateLoader,

          useFactory: translateLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    MetaSsrService,
  ],
};
