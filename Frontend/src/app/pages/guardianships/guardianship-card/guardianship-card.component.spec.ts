import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianshipCardComponent } from './guardianship-card.component';
import { TranslateModule } from '@ngx-translate/core';

describe('GuardianshipCardComponent', () => {
  let component: GuardianshipCardComponent;
  let fixture: ComponentFixture<GuardianshipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardianshipCardComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardianshipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
