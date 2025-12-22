import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizationComponent } from './event-organization.component';
import { TranslateModule } from '@ngx-translate/core';

describe('EventOrganizationComponent', () => {
  let component: EventOrganizationComponent;
  let fixture: ComponentFixture<EventOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOrganizationComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
