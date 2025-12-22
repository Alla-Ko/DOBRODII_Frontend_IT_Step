import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerApplicationConfirmationComponent } from './volunteer-application-confirmation.component';
import { TranslateModule } from '@ngx-translate/core';

describe('VolunteerApplicationConfirmationComponent', () => {
  let component: VolunteerApplicationConfirmationComponent;
  let fixture: ComponentFixture<VolunteerApplicationConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerApplicationConfirmationComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerApplicationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
