import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordConfirmationComponent } from './forgot-password-confirmation.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ForgotPasswordConfirmationComponent', () => {
  let component: ForgotPasswordConfirmationComponent;
  let fixture: ComponentFixture<ForgotPasswordConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordConfirmationComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
