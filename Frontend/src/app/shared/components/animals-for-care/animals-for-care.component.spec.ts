import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsForCareComponent } from './animals-for-care.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AnimalsForCareComponent', () => {
  let component: AnimalsForCareComponent;
  let fixture: ComponentFixture<AnimalsForCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsForCareComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsForCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
