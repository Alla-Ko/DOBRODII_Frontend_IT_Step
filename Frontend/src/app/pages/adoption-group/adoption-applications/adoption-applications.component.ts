import { Component, computed, inject, Signal, signal } from '@angular/core';
import { PrimaryLargeOrangeButtonComponent } from '../../../shared/components/buttons/orange/primary-large-orange-button.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { IconComponent } from '../../../shared/components/icon.component';

import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AdoptionApplication } from '../../../core/models/adoptionApplication';
import { Animal } from '../../../core/models/animal';
import { AdoptionApplicationService } from '../../../core/services/adoption-application.service';
import { AnimalSubscriptionService } from '../../../core/services/animal-subscription.service';
import { AnimalService } from '../../../core/services/animal.service';
import { AuthService } from '../../../core/services/auth.service';
import { AdoptionApplicationCardComponent } from '../adoption-application-card/adoption-application-card.component';
import { LoadingSpinnerComponent } from "../../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-adoption-applications',
  standalone: true,
  imports: [
    PrimaryLargeOrangeButtonComponent,
    ConfirmModalComponent,
    IconComponent,
    TranslateModule,
    UpperCasePipe,
    AdoptionApplicationCardComponent,
    LoadingSpinnerComponent
],
  templateUrl: './adoption-applications.component.html',
  styleUrl: './adoption-applications.component.css',
})
export class AdoptionApplicationsComponent {
  authService = inject(AuthService);
  animalService = inject(AnimalService);
  isAuthenticated: Signal<boolean> = this.authService.isLoggedIn;
  adoptionApplicationService = inject(AdoptionApplicationService);
  animalSubscriptionService = inject(AnimalSubscriptionService);

  router = inject(Router);
  loading = signal(false);
  showModal = signal(false);
  private rawadoptionApplications = signal<AdoptionApplication[]>([]);
  private favoriteAnimalIds = signal<Set<string>>(new Set());
  adoptionApplications = computed(() => {
    const favIds = this.favoriteAnimalIds();
    return this.rawadoptionApplications().map(a => ({
      ...a,
      animal: {
        ...a.animal,
        isFavorite: favIds.has(a.animal?.id),
      },
    }));
  });
  cancelationApplicationId = signal('');
  constructor() {
    this.loadAdoptionApplications();
    this.loadFavoriteAnimalIds();
  }
  loadAdoptionApplications() {
    if (!this.isAuthenticated()) return;
    this.loading.set(true);
    this.adoptionApplicationService.getMyAdoptionApplications().subscribe({
      next: adoptionApplications => {
        adoptionApplications.forEach(adoptionApplication => {
          if (!adoptionApplication.animalId) return;
          this.loadAnimal(adoptionApplication.animalId).subscribe(animal => {
            adoptionApplication.animal = {
              ...animal,
              isChecked: true,
              photo: animal.photos?.[0] ?? 'assets/default-animal.jpg',
              age: this.calculateAgeParts(animal.birthday),
            };

            this.rawadoptionApplications.update(currentValue => [
              ...currentValue,
            ]);
          });
        });

        this.rawadoptionApplications.set(adoptionApplications);

      },
      error: () => {
        this.rawadoptionApplications.set([]);
      },
      complete: () => this.loading.set(false),
    });
  }
  loadAnimal(id: string): Observable<Animal> {
    return this.animalService.getAnimalById(id);
  }
  private loadFavoriteAnimalIds() {
    this.loading.set(true);
    if (!this.isAuthenticated()) return;
    this.animalSubscriptionService.getFavoriteAnimals().subscribe({
      next: favs => {
        this.favoriteAnimalIds.set(new Set(favs.map(a => a.id)));
      },
      error: () => {
        this.favoriteAnimalIds.set(new Set());
      },
      complete: () => this.loading.set(false),
    });
  }
  toDeleteAdoptionApplication(id: string) {
    this.cancelationApplicationId.set(id);
    this.showModal.set(true);
  }
  toSubmitCancel($event: boolean) {
    if (!this.isAuthenticated()) return;
    if ($event) {
      this.adoptionApplicationService
        .cancelAdoptionApplication(this.cancelationApplicationId())
        .subscribe({
          next: () => this.loadAdoptionApplications(),
          error: err => console.error('Error deleting application:', err),
        });
    }
    this.showModal.set(false);
    this.cancelationApplicationId.set('');
  }
  toggleFavourite(animalId: string) {
    const isFavorite = this.favoriteAnimalIds().has(animalId);

    if (isFavorite) {
      this.animalSubscriptionService
        .deleteAnimalSubscription(animalId)
        .subscribe({
          next: () => {
            this.favoriteAnimalIds.update(set => {
              const newSet = new Set(set);
              newSet.delete(animalId);
              return newSet;
            });
          },
          error: () => {
            // нічого не робимо
          },
        });
    } else {
      this.animalSubscriptionService
        .createAnimalSubscription(animalId)
        .subscribe({
          next: () => {
            this.favoriteAnimalIds.update(set => new Set([...set, animalId]));
          },
          error: () => {
            // нічого не робимо
          },
        });
    }
  }
  toProfile() {
    this.router.navigate(['/profile']);
  }
  toAllAnimals() {
    this.router.navigate(['/animals']);
  }
  private calculateAgeParts(birthday: string): [number, number] {
    const today = new Date();
    const birthdate = new Date(birthday);
    const ageInMilliseconds = today.getTime() - birthdate.getTime();
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    return [years, months];
  }
}
