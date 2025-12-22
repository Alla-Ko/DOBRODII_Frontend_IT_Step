import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AnimalAidRequestDetailComponent } from './animal-aid-request-detail.component';

describe('AnimalAidRequestDetailComponent', () => {
  let component: AnimalAidRequestDetailComponent;
  let fixture: ComponentFixture<AnimalAidRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AnimalAidRequestDetailComponent,
        TranslateModule.forRoot(), // якщо компонент використовує translate pipe
      ],
      providers: [
        // Просто передаємо пусті об’єкти, щоб DI не ламався
        { provide: ActivatedRoute, useValue: { params: of({ slug: '1' }) } },
        { provide: 'AnimalAidRequestService', useValue: {} },
        { provide: 'MetaSsrService', useValue: {} },
        { provide: 'LiqPayService', useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalAidRequestDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
