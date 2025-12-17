import { CommonModule, LowerCasePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AnimalAidRequest } from '../../../core/models/animalAidRequest';

import { SecondaryLargeButtonComponent } from '../../../shared/components/buttons/blue/secondary-large-button.component';

@Component({
  selector: 'app-animal-aid-request-card',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LowerCasePipe,
    SecondaryLargeButtonComponent,
  ],
  templateUrl: './animal-aid-request-card.component.html',
  styleUrl: './animal-aid-request-card.component.css',
})
export class AnimalAidRequestCardComponent {
  project = input.required<AnimalAidRequest>();
  progress = computed(() => {
    const project = this.project();

    let allreadyDonated = project?.allreadyDonated;
    console.log(allreadyDonated);
    if (!allreadyDonated) {
      allreadyDonated = 0;
    }
    if (!project || !project.estimatedCost) {
      return 0;
    }

    return (allreadyDonated / project.estimatedCost) * 100;
  });
  router = inject(Router);
  onClick() {
    this.router.navigate(['projects', this.project().slug]);
  }
}
