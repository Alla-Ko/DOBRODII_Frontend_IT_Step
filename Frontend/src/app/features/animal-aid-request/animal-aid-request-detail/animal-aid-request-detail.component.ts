import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { AnimalAidRequest } from '../../../core/models/animalAidRequest';
import { PaymentScope } from '../../../core/models/liqPayCheckoutRequest';
import { ProjectPayment } from '../../../core/models/projectPayment';
import { AnimalAidRequestService } from '../../../core/services/animal-aid-request.service';
import { LiqPayService } from '../../../core/services/liq-pay-service.service';
import { MetaSsrService } from '../../../core/services/meta-ssr.service'; // Новий сервіс
import { PrimaryLargeButtonComponent } from '../../../shared/components/buttons/blue/primary-large-button.component';
import { IconComponent } from '../../../shared/components/icon.component';
import { PhotoCollectionsComponent } from '../../../shared/components/photo-collections/photo-collections.component';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { ProjectPaymentItemComponent } from '../../../shared/components/project-payment-item/project-payment-item.component';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-animal-aid-request-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LoadingSpinnerComponent,
    PhotoCollectionsComponent,
    IconComponent,
    ProjectPaymentItemComponent,
    ProgressBarComponent,
    PrimaryLargeButtonComponent,
  ],
  templateUrl: './animal-aid-request-detail.component.html',
  styleUrl: './animal-aid-request-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalAidRequestDetailComponent {
  private route = inject(ActivatedRoute);
  public router = inject(Router);

  private animalAidRequestService = inject(AnimalAidRequestService);
  public translate = inject(TranslateService);
  private metaSsr = inject(MetaSsrService); // Новий сервіс
  private liqpayService = inject(LiqPayService);
  progress = computed(() => {
    const request = this.animalAidRequest();

    let allreadyDonated = request?.allreadyDonated;
    console.log(allreadyDonated);
    if (!allreadyDonated) {
      allreadyDonated = 0;
    }
    if (!request || !request.estimatedCost) {
      return 0;
    }
    console.log((allreadyDonated / request.estimatedCost) * 100);
    return (allreadyDonated / request.estimatedCost) * 100;
  });
  remain = computed(() => {
    const request = this.animalAidRequest();
    if (!request || !request.estimatedCost) {
      return 0;
    }
    const allreadyDonated = request.allreadyDonated;
    if (!allreadyDonated) {
      return request.estimatedCost;
    }
    const remain = request.estimatedCost - allreadyDonated;
    if (remain < 0) {
      return 0;
    }
    return request.estimatedCost - allreadyDonated;
  });
  loading = signal<boolean>(true);

  animalAidRequestSlug = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => [params.get('slug')]),
      filter((id): id is string => id !== null && id !== undefined)
    )
  );

  animalAidRequest = signal<AnimalAidRequest | undefined>(undefined);
  lastPayments = signal<ProjectPayment[]>([]);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      const animalAidRequestSlugValue = this.animalAidRequestSlug();
      if (!animalAidRequestSlugValue) return;

      this.animalAidRequestService
        .getAnimalAidRequestBySlug(animalAidRequestSlugValue)
        .pipe(
          tap(() => this.loading.set(true)),
          finalize(() => this.loading.set(false))
        )
        .subscribe({
          next: animalAidRequest => {
            if (!animalAidRequest) {
              this.router.navigate(['/not-found']);
              return;
            }

            this.animalAidRequest.set(animalAidRequest);
            this.animalAidRequestService
              .getLastPaymentsByAnimalAidRequestId(animalAidRequest.id)
              .subscribe(payments => {
                this.lastPayments.set(payments);
              });

            // НОВІ мета-теги (вже з MetaSsrService)
            this.updateMetaTags(animalAidRequest);

            // Твій JSON-LD
            this.addJsonLd(animalAidRequest);
          },
        });
    });
  }
  backBottomClick() {
    this.router.navigate(['projects']);
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
  }
  // НОВА ФУНКЦІЯ — заміна всіх старих meta.updateTag + title.setTitle
  private updateMetaTags(request: AnimalAidRequest) {
    const title = `${request.title} — Добродій`;
    const description = request.description
      ? request.description.split(' ').slice(0, 30).join(' ') + '...'
      : `Допоможи притулку зібрати ${request.estimatedCost} грн на ${request.category.toLowerCase()} ❤️`;

    const image =
      request.photos?.[0] ||
      'https://i.pinimg.com/1200x/4f/53/64/4f5364ff9ca98be71bbe2445e53ab17c.jpg';

    const url = `https://dobrodii.onrender.com/animal-aid-requests/${request.slug}`;

    this.metaSsr.update(title, description, image, url);
  }

  // Твій JSON-LD залишається без змін — він ідеально працює
  addJsonLd(animalAidRequest: AnimalAidRequest) {
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach(el => el.remove());

    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const shortDescription = animalAidRequest.description
      ? animalAidRequest.description.split(' ').slice(0, 25).join(' ')
      : '';

    const jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Demand',
      name: animalAidRequest.title,
      description: shortDescription,
      category: animalAidRequest.category,
      availability: 'https://schema.org/InStock',
    };

    if (animalAidRequest.photos?.length) {
      jsonLd['image'] = animalAidRequest.photos;
    }

    const cost = Number(animalAidRequest.estimatedCost);
    if (!isNaN(cost) && cost > 0) {
      jsonLd['priceSpecification'] = {
        '@type': 'PriceSpecification',
        price: cost,
        priceCurrency: 'UAH',
      };
    }

    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}
