import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InputSignal, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnimalAidRequest } from '../../../core/models/animalAidRequest';
import { AnimalAidRequestCardComponent } from './animal-aid-request-card.component';

describe('AnimalAidRequestCardComponent', () => {
  let component: AnimalAidRequestCardComponent;
  let fixture: ComponentFixture<AnimalAidRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalAidRequestCardComponent, TranslateModule.forRoot()],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalAidRequestCardComponent);
    component = fixture.componentInstance;
    const testProject: AnimalAidRequest = {
      id: '1',
      slug: 'test-slug',
      title: 'Test',
      category: 'Other',
      status: 'Open',
      estimatedCost: 100,
    };

    component.project = signal(
      testProject
    ) as unknown as InputSignal<AnimalAidRequest>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
