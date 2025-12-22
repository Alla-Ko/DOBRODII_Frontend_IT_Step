import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicOfferComponent } from './public-offer.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PublicOfferComponent', () => {
  let component: PublicOfferComponent;
  let fixture: ComponentFixture<PublicOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicOfferComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
