import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmailComponent } from './register-email.component';
import { TranslateModule } from '@ngx-translate/core';

describe('RegisterEmailComponent', () => {
  let component: RegisterEmailComponent;
  let fixture: ComponentFixture<RegisterEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEmailComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
