import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentItemComponent } from './payment-item.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PaymentItemComponent', () => {
  let component: PaymentItemComponent;
  let fixture: ComponentFixture<PaymentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentItemComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
