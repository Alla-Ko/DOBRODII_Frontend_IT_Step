import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareSubscriptionSuccesComponent } from './care-subscription-succes.component';
import { TranslateModule } from '@ngx-translate/core';

describe('CareSubscriptionSuccesComponent', () => {
  let component: CareSubscriptionSuccesComponent;
  let fixture: ComponentFixture<CareSubscriptionSuccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareSubscriptionSuccesComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareSubscriptionSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
