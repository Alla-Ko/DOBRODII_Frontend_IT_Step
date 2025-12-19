import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimaryLargeButtonComponent } from '../../../shared/components/buttons/blue/primary-large-button.component';
import { IconComponent } from '../../../shared/components/icon.component';

@Component({
  selector: 'app-adoption-applications-failed',
  standalone: true,
  imports: [
    TranslateModule,
    UpperCasePipe,
    IconComponent,
    PrimaryLargeButtonComponent,
  ],
  templateUrl: './adoption-applications-failed.component.html',
  styleUrl: './adoption-applications-failed.component.css',
})
export class AdoptionApplicationsFailedComponent {
  router = inject(Router);
  goToFeedbackForm() {
    this.router.navigate(['/feedback-form']);
  }
}
