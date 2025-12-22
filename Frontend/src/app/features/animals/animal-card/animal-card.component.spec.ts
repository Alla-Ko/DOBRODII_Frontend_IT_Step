import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCardComponent } from './animal-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AnimalCardComponent', () => {
  let component: AnimalCardComponent;
  let fixture: ComponentFixture<AnimalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalCardComponent,TranslateModule.forRoot()],
			 providers: [provideHttpClientTesting()],


    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
