import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProjectCardComponent } from './home-project-card.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeProjectCardComponent', () => {
  let component: HomeProjectCardComponent;
  let fixture: ComponentFixture<HomeProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProjectCardComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
