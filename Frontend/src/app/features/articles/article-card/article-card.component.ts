import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Article } from '../../../core/models/article';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [UpperCasePipe, TranslateModule, CommonModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
})
export class ArticleCardComponent {
  article = input.required<Partial<Article>>();
}
