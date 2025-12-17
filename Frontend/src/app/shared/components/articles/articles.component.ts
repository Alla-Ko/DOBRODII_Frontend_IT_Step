import {
  Component,
  effect,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Article } from '../../../core/models/article';
import { ArticleService } from '../../../core/services/article.service';
import { ArticleCardComponent } from '../../../features/successStories/article-card/article-card.component';

@Component({
  selector: 'app-articles',
  imports: [ArticleCardComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {
  numberOfArticles = input.required<number>();
  translate = inject(TranslateService);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);
  articlesService = inject(ArticleService);
  articles = signal<Partial<Article>[]>([]);
  constructor() {
    effect(() => {
      this.loadArticles();

      this.translate.onLangChange.subscribe(() => {
        this.loadArticles();
      });
    });
  }
  loadArticles() {
    let nArticles = this.numberOfArticles();
    if (!nArticles) nArticles = 2;
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    if (lang === 'en') {
      const allArticles = this.articlesService.getEnAriticles();
      this.articles.set(allArticles.slice(0, nArticles));
    } else if (lang === 'uk') {
      const allArticles = this.articlesService.getUkAriticles();

      this.articles.set(allArticles.slice(0, nArticles));
    }
  }
}
