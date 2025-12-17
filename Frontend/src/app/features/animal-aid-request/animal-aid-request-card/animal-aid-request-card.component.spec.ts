import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAidRequestCardComponent } from './animal-aid-request-card.component';

describe('AnimalAidRequestCardComponent', () => {
  let component: AnimalAidRequestCardComponent;
  let fixture: ComponentFixture<AnimalAidRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalAidRequestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalAidRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
