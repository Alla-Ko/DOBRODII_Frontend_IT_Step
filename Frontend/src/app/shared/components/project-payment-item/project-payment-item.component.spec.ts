import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPaymentItemComponent } from './project-payment-item.component';

describe('ProjectPaymentItemComponent', () => {
  let component: ProjectPaymentItemComponent;
  let fixture: ComponentFixture<ProjectPaymentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPaymentItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPaymentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
