import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormComponent } from './feedback-form.component';
import { TranslateModule } from '@ngx-translate/core';

describe('FeedbackFormComponent', () => {
  let component: FeedbackFormComponent;
  let fixture: ComponentFixture<FeedbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackFormComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
