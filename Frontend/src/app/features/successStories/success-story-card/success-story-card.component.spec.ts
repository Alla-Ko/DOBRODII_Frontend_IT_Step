import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStoryCardComponent } from './success-story-card.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SuccesStoryCardComponent', () => {
  let component: SuccessStoryCardComponent;
  let fixture: ComponentFixture<SuccessStoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessStoryCardComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessStoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
