import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAmountComponent } from './payment-amount.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PaymentAmountComponent', () => {
  let component: PaymentAmountComponent;
  let fixture: ComponentFixture<PaymentAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAmountComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
