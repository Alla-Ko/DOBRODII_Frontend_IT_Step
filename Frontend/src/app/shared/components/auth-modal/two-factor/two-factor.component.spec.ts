import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorComponent } from './two-factor.component';
import { TranslateModule } from '@ngx-translate/core';

describe('TwoFactorComponent', () => {
  let component: TwoFactorComponent;
  let fixture: ComponentFixture<TwoFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoFactorComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
