import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordErrorComponent } from './reset-password-error.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ResetPasswordErrorComponent', () => {
  let component: ResetPasswordErrorComponent;
  let fixture: ComponentFixture<ResetPasswordErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordErrorComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
