import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { ArticlesComponent } from '../../../shared/components/articles/articles.component';
import { HomePartnersComponent } from '../../../shared/components/home-partners/home-partners.component';
import { IconComponent } from '../../../shared/components/icon.component';

@Component({
  selector: 'app-success-storylist',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    IconComponent,

    HomePartnersComponent,

    ArticlesComponent,
  ],
  templateUrl: './success-story-list.component.html',
  styleUrl: './success-story-list.component.css',
})
export class SuccessStoryListComponent {
  router = inject(Router);
  currentPage = signal(2);
  totalPages = signal(10);
  platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
          });
      }
    });
  }
  setPage(page: number) {
    this.currentPage.set(page);
  }
  backBottomClick() {
    this.router.navigate(['about']);
  }

  error = signal<string | null>(null);
}
