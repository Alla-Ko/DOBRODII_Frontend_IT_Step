import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  progress = input.required<number>();
  get clampedProgress(): number {
    return Math.min(100, Math.max(0, this.progress()));
  }
}
