import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardComponent } from './news-card.component';
import { TranslateModule } from '@ngx-translate/core';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
