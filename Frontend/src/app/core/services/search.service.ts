import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { SearchResponse } from '../models/searchResponse';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private api = inject(ApiService);
  private readonly endpoint = 'search';
  private translate = inject(TranslateService);
  search(query: string): Observable<SearchResponse> {
    const lang = this.translate.currentLang || this.translate.defaultLang;
    return this.api
      .post<SearchResponse>(this.endpoint, {
        query,
        language: lang,
      })
      .pipe(
        map(response => ({
          ...response,

          animals: response.animals.map(a => ({
            ...a,
            route: `/animals/${a.slug}`,
          })),
          news: response.news.map(n => ({ ...n, route: `/news/${n.slug}` })),
          projects: response.projects.map(p => ({
            ...p,
            route: `/projects/${p.slug}`,
          })),
          shelters: response.shelters.map(s => ({
            ...s,
            route: `/shelters/${s.slug}`,
          })),
          stories: response.stories.map(s => ({
            ...s,
            route: '/success-stories',
          })),
          pages: response.pages.map(p => ({ ...p, route: `${p.slug}` })),
        }))
      );
  }
}
