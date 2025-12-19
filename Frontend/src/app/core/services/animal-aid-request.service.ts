import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AnimalAidRequest } from '../models/animalAidRequest';
import { ProjectPayment } from '../models/projectPayment';
import { ApiService } from './api.service';
import { ShelterService } from './shelter.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalAidRequestService {
  private api = inject(ApiService);
  private endpoint = `animal-aid-requests`;

  private shelterService = inject(ShelterService);

  getAnimalAidRequests(): Observable<AnimalAidRequest[]> {
    return this.api.get<AnimalAidRequest[]>(this.endpoint);
  }

  getAnimalAidRequestBySlug(
    slug: string
  ): Observable<AnimalAidRequest | undefined> {
    return this.api.getBySlug<AnimalAidRequest>(this.endpoint, slug);
  }
  getUrgentAnimalAidRequests(): Observable<AnimalAidRequest | undefined> {
    return this.api
      .get<AnimalAidRequest[]>(`${this.endpoint}/urgent`)
      .pipe(map(list => list[0]));
  }
  getLastPayments(): Observable<ProjectPayment[]> {
    return this.api.get<ProjectPayment[]>(`payments/donations/all`).pipe(
      map(payments => payments.slice(0, 4)) // беремо лише перші 4
    );
  }
  getLastPaymentsByAnimalAidRequestId(
    id: string
  ): Observable<ProjectPayment[]> {
    return this.api
      .get<ProjectPayment[]>(`payments/donations/project/${id}`)
      .pipe(
        map(payments => payments.slice(0, 4)) // беремо лише перші 4
      );
  }
}
