import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupCodeLoginComponent } from './backup-code-login.component';
import { TranslateModule } from '@ngx-translate/core';

describe('BackupCodeLoginComponent', () => {
  let component: BackupCodeLoginComponent;
  let fixture: ComponentFixture<BackupCodeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackupCodeLoginComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackupCodeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
