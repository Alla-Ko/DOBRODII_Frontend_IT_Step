import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../shared/components/icon.component';

import { filter, map, switchMap } from 'rxjs';
import { SearchResponse } from '../../core/models/searchResponse';
import { SearchService } from '../../core/services/search.service';
import { SearchCardComponent } from '../../shared/components/search-card/search-card.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    IconComponent,
    TranslateModule,
    UpperCasePipe,
    SearchCardComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit {
  route = inject(ActivatedRoute);
  token: string | null = null;
  router = inject(Router);
  searchString = signal<string>('');
  searchResults = signal<SearchResponse>({
    animals: [],
    shelters: [],
    projects: [],
    news: [],
    stories: [],
    pages: [],
  });
  inProcess = signal<boolean>(false);
  animalsOpen = signal<boolean>(true);
  sheltersOpen = signal<boolean>(true);
  projectsOpen = signal<boolean>(true);
  newsOpen = signal<boolean>(true);
  storiesOpen = signal<boolean>(true);
  pagesOpen = signal<boolean>(true);

  searchService = inject(SearchService);
  backBottomClick() {
    this.router.navigate(['/']);
  }
  ngOnInit() {
    this.inProcess.set(true);
    this.route.queryParamMap
      .pipe(
        map(params => params.get('searchString') || ''),
        filter(searchString => {
          if (!searchString || searchString.length < 3) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }),
        switchMap(searchString => {
          this.inProcess.set(true);
          this.searchString.set(searchString);

          return this.searchService.search(searchString);
        })
      )
      .subscribe(res => {
        this.searchResults.set(res);
        this.inProcess.set(false);
      });
  }
  toggleAnimals() {
    this.animalsOpen.set(!this.animalsOpen());
  }
  toggleShelters() {
    this.sheltersOpen.set(!this.sheltersOpen());
  }
  toggleProjects() {
    this.projectsOpen.set(!this.projectsOpen());
  }
  toggleNews() {
    this.newsOpen.set(!this.newsOpen());
  }
  toggleStories() {
    this.storiesOpen.set(!this.storiesOpen());
  }
  togglePages() {
    this.pagesOpen.set(!this.pagesOpen());
  }
}
