import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalAidRequest } from '../../../../core/models/animalAidRequest';
import { AnimalAidRequestService } from '../../../../core/services/animal-aid-request.service';

import { CommonModule, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentScope } from '../../../../core/models/liqPayCheckoutRequest';
import { ProjectPayment } from '../../../../core/models/projectPayment';
import { LiqPayService } from '../../../../core/services/liq-pay-service.service';
import { ModalService } from '../../../../core/services/modal.service';
import { PrimaryLargeButtonComponent } from '../../buttons/blue/primary-large-button.component';
import { IconComponent } from '../../icon.component';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { ProjectPaymentItemComponent } from '../../project-payment-item/project-payment-item.component';

@Component({
  selector: 'app-live-donation-collection',
  imports: [
    IconComponent,
    UpperCasePipe,
    TranslateModule,
    ProgressBarComponent,
    CommonModule,
    PrimaryLargeButtonComponent,
    ProjectPaymentItemComponent,
  ],
  templateUrl: './live-donation-collection.component.html',
  styleUrl: './live-donation-collection.component.css',
})
export class LiveDonationCollectionComponent {
  animalAidRequest = signal<AnimalAidRequest | undefined>(undefined);
  animalAidRequestService = inject(AnimalAidRequestService);
  payments = signal<ProjectPayment[]>([]);
  liqpayService = inject(LiqPayService);
  router = inject(Router);
  modalService = inject(ModalService);
  progress = computed(() => {
    const request = this.animalAidRequest();

    let collectedAmount = request?.collectedAmount;

    if (!collectedAmount) {
      collectedAmount = 0;
    }
    if (!request || !request.estimatedCost) {
      return 0;
    }

    return (collectedAmount / request.estimatedCost) * 100;
  });
  remain = computed(() => {
    const request = this.animalAidRequest();
    if (!request || !request.estimatedCost) {
      return 0;
    }
    const collectedAmount = request.collectedAmount;
    if (!collectedAmount) {
      return request.estimatedCost;
    }
    const remain = request.estimatedCost - collectedAmount;
    if (remain < 0) {
      return 0;
    }
    return request.estimatedCost - collectedAmount;
  });
  constructor() {
    this.animalAidRequestService
      .getUrgentAnimalAidRequests()
      .subscribe(animalAidRequest => {
        this.animalAidRequest.set(animalAidRequest);
      });

    this.animalAidRequestService.getLastPayments().subscribe(payments => {
      this.payments.set(payments);
    });
  }
  toDonate() {
    const request = this.animalAidRequest();
    if (!request) return;
    try {
      this.liqpayService.startPayment({
        scope: 'aidRequest' as PaymentScope,
        isRecurring: true,
        entityId: request.id,
      });
      this.router.navigate(['/payment/amount']);
    } catch (err) {
      console.error(err);
    }


    this.modalService.closeModal();
  }
  toAnimalAidRequests() {
    this.router.navigate(['projects']);
    this.modalService.closeModal();
  }
}
