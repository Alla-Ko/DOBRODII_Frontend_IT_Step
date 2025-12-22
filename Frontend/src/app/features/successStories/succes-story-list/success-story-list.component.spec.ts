import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStoryListComponent } from './success-story-list.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SuccessStoryListComponent', () => {
  let component: SuccessStoryListComponent;
  let fixture: ComponentFixture<SuccessStoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessStoryListComponent,TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessStoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
