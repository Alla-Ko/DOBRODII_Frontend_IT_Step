import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTotpComponent } from './setup-totp.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SetupTotpComponent', () => {
  let component: SetupTotpComponent;
  let fixture: ComponentFixture<SetupTotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupTotpComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupTotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
