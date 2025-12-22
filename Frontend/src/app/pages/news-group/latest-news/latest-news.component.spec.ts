import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsComponent } from './latest-news.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LatestNewsComponent', () => {
  let component: LatestNewsComponent;
  let fixture: ComponentFixture<LatestNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestNewsComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
