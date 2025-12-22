import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusComponent } from './payment-status.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PaymentStatusComponent', () => {
  let component: PaymentStatusComponent;
  let fixture: ComponentFixture<PaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
