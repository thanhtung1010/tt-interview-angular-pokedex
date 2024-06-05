import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { APIService } from './services/api.service';

export function HTTPLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export const appConfig: ApplicationConfig = {
  providers: [
    APIService,
    provideRouter(routes),
    importProvidersFrom([
      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: environment.defaultLang,
        loader: {
          provide: TranslateLoader,
          useFactory: HTTPLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
  ]
};
