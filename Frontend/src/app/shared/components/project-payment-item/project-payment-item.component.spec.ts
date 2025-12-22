import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPaymentItemComponent } from './project-payment-item.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ProjectPaymentItemComponent', () => {
  let component: ProjectPaymentItemComponent;
  let fixture: ComponentFixture<ProjectPaymentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPaymentItemComponent,TranslateModule.forRoot()]
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
