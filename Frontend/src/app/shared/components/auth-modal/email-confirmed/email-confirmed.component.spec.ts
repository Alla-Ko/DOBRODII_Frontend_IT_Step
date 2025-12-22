import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmedComponent } from './email-confirmed.component';
import { TranslateModule } from '@ngx-translate/core';

describe('EmailConfirmedComponent', () => {
  let component: EmailConfirmedComponent;
  let fixture: ComponentFixture<EmailConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailConfirmedComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
