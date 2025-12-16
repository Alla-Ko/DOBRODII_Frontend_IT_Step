import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectPayment } from '../../../core/models/projectPayment';

@Component({
  selector: 'app-project-payment-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-payment-item.component.html',
  styleUrl: './project-payment-item.component.css',
})
export class ProjectPaymentItemComponent {
  payment = input.required<ProjectPayment>();
}
