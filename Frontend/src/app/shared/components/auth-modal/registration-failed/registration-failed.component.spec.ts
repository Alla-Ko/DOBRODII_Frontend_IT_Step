import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFailedComponent } from './registration-failed.component';
import { TranslateModule } from '@ngx-translate/core';

describe('RegistrationFailedComponent', () => {
  let component: RegistrationFailedComponent;
  let fixture: ComponentFixture<RegistrationFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFailedComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
