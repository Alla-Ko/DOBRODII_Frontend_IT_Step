import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySettingsComponent } from './security-settings.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SecuritySettingsComponent', () => {
  let component: SecuritySettingsComponent;
  let fixture: ComponentFixture<SecuritySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuritySettingsComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuritySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
