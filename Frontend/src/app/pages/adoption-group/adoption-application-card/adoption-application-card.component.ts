import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdoptionApplication } from '../../../core/models/adoptionApplication';
import { AnimalCardComponent } from '../../../features/animals/animal-card/animal-card.component';
import { PrimaryLargeOrangeButtonComponent } from '../../../shared/components/buttons/orange/primary-large-orange-button.component';

@Component({
  selector: 'app-adoption-application-card',
  standalone: true,
  imports: [
    AnimalCardComponent,
    TranslateModule,
    CommonModule,

    PrimaryLargeOrangeButtonComponent,
  ],
  templateUrl: './adoption-application-card.component.html',
  styleUrl: './adoption-application-card.component.css',
})
export class AdoptionApplicationCardComponent {
  adoptionApplication = input.required<AdoptionApplication>();
  animalSignal = computed(() => this.adoptionApplication().animal);
  @Output() toggleFavourite = new EventEmitter<string>();

  @Output() deleteAdoptionApplication = new EventEmitter<void>();
  @Output() contactUs = new EventEmitter<void>();
  router = inject(Router);

  toDeleteAdoptionApplication() {
    this.deleteAdoptionApplication.emit();
  }
  toContactUs() {
    this.router.navigate(['/feedback-form']);
  }

  onHeartClick() {
    this.toggleFavourite.emit(this.animalSignal().id);
  }
  onAnimalDetailClick() {
    this.router.navigate(['/animals', this.animalSignal().slug]);
  }
  toShelter(arg0: string) {
    this.router.navigate(['/shelters', arg0]);
  }
}
