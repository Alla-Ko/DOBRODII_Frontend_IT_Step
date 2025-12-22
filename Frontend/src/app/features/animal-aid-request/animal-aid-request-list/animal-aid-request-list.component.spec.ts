import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AnimalAidRequestListComponent } from './animal-aid-request-list.component';

describe('AnimalAidRequestListComponent', () => {
  let component: AnimalAidRequestListComponent;
  let fixture: ComponentFixture<AnimalAidRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AnimalAidRequestListComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalAidRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
