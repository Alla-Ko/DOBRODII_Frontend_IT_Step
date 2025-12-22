import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordErrorComponent } from './change-password-error.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ChangePasswordErrorComponent', () => {
  let component: ChangePasswordErrorComponent;
  let fixture: ComponentFixture<ChangePasswordErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePasswordErrorComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
