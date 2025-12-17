import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { catchError, finalize, of, tap } from 'rxjs';
import { AnimalAidRequestService } from '../../../core/services/animal-aid-request.service';
import { IconComponent } from '../../../shared/components/icon.component';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';
import { AnimalAidRequestCardComponent } from '../animal-aid-request-card/animal-aid-request-card.component';
import { HomePartnersComponent } from "../../../shared/components/home-partners/home-partners.component";

@Component({
  selector: 'app-animal-aid-request-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LoadingSpinnerComponent,
    AnimalAidRequestCardComponent,
    IconComponent,
    HomePartnersComponent
],

  templateUrl: './animal-aid-request-list.component.html',
  styleUrl: './animal-aid-request-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalAidRequestListComponent {
  private animalAidRequestService = inject(AnimalAidRequestService);
  router = inject(Router);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  animalAidRequests = toSignal(
    this.animalAidRequestService.getAnimalAidRequests().pipe(
      tap(() => {
        this.loading.set(true); // на старті потоку (при підписці)
      }),
      finalize(() => {
        this.loading.set(false); // коли потік завершується (успішно або з помилкою)
      }),
      catchError(err => {
        this.error.set('FAILED_TO_LOAD_ANIMAL_AID_REQUESTS');
        console.error('Error loading animalAidRequests:', err);
        return of([]); // Повертаємо порожній список, щоб Signal не впав
      })
    ),
    { initialValue: [] }
  );
  backBottomClick() {
    this.router.navigate(['']);
  }
}
