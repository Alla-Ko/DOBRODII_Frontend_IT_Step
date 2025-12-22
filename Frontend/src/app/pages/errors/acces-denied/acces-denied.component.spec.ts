import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesDeniedComponent } from './acces-denied.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AccesDeniedComponent', () => {
  let component: AccesDeniedComponent;
  let fixture: ComponentFixture<AccesDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesDeniedComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
