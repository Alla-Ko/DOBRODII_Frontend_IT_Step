import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionComponent } from './adoption.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AdoptionComponent', () => {
  let component: AdoptionComponent;
  let fixture: ComponentFixture<AdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
