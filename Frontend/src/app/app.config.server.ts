import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import localeUk from '@angular/common/locales/uk';
import {
  ApplicationConfig,
  LOCALE_ID,
  mergeApplicationConfig,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { MetaSsrService } from './core/services/meta-ssr.service';

registerLocaleData(localeUk);

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    provideServerRoutesConfig(serverRoutes),

    { provide: LOCALE_ID, useValue: 'uk-UA' },
    MetaSsrService,
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
