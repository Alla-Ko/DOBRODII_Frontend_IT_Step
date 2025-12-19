import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionApplicationCardComponent } from './adoption-application-card.component';

describe('AdoptionApplicationCardComponent', () => {
  let component: AdoptionApplicationCardComponent;
  let fixture: ComponentFixture<AdoptionApplicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionApplicationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionApplicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
