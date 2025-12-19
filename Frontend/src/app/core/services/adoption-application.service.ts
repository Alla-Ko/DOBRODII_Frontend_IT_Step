import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionApplication } from '../models/adoptionApplication';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AdoptionApplicationService {
  private api = inject(ApiService);
  private endpoint = `adoption-applications`;

  createAdoptionApplication(
    adoptionApplication: Partial<AdoptionApplication>
  ): Observable<AdoptionApplication> {
    return this.api.post(this.endpoint, adoptionApplication);
  }
  getMyAdoptionApplications(): Observable<AdoptionApplication[]> {
    return this.api.get<AdoptionApplication[]>(`${this.endpoint}/my`);
  }
  cancelAdoptionApplication(adoptionApplicationId: string) {
    return this.api.delete(this.endpoint, adoptionApplicationId);
  }
}
