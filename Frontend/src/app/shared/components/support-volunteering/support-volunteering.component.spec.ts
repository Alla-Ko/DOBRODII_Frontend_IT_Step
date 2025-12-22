import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportVolunteeringComponent } from './support-volunteering.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SupportVolunteeringComponent', () => {
  let component: SupportVolunteeringComponent;
  let fixture: ComponentFixture<SupportVolunteeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportVolunteeringComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportVolunteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
