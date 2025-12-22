import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaymentsComponent } from './my-payments.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MyPaymentsComponent', () => {
  let component: MyPaymentsComponent;
  let fixture: ComponentFixture<MyPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPaymentsComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
