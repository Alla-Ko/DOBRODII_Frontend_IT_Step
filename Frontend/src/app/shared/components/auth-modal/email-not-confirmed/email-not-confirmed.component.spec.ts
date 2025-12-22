import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotConfirmedComponent } from './email-not-confirmed.component';
import { TranslateModule } from '@ngx-translate/core';

describe('EmailNotConfirmedComponent', () => {
  let component: EmailNotConfirmedComponent;
  let fixture: ComponentFixture<EmailNotConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailNotConfirmedComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailNotConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
