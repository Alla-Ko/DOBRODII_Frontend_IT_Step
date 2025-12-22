import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailErrorComponent } from './send-email-error.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SendEmailErrorComponent', () => {
  let component: SendEmailErrorComponent;
  let fixture: ComponentFixture<SendEmailErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendEmailErrorComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendEmailErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
