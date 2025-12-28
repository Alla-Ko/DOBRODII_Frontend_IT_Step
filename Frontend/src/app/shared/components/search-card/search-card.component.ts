import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchCard } from '../../../core/models/searchResponse';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css',
})
export class SearchCardComponent {
  onItemClick() {
    throw new Error('Method not implemented.');
  }
  item = input.required<SearchCard>();
}
