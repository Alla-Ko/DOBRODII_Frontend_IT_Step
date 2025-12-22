import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProjectsComponent } from './home-projects.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeProjectsComponent', () => {
  let component: HomeProjectsComponent;
  let fixture: ComponentFixture<HomeProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProjectsComponent,TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
