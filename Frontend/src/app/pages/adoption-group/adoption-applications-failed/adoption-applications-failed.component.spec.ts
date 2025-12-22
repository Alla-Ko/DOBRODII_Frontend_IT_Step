import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionApplicationsFailedComponent } from './adoption-applications-failed.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AdoptionApplicationsFailedComponent', () => {
  let component: AdoptionApplicationsFailedComponent;
  let fixture: ComponentFixture<AdoptionApplicationsFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionApplicationsFailedComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionApplicationsFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
