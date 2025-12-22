import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceUnavailableComponent } from './service-unavailable.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ServiceUnavailableComponent', () => {
  let component: ServiceUnavailableComponent;
  let fixture: ComponentFixture<ServiceUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceUnavailableComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
