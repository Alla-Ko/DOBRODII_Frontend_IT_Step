import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Shelter } from '../../../core/models/shelter';
import { ShelterService } from '../../../core/services/shelter.service';
import { ShelterListComponent } from './shelter-list.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ShelterListComponent', () => {
  let component: ShelterListComponent;
  let fixture: ComponentFixture<ShelterListComponent>;

  const shelterServiceMock = {
    getShelters: jasmine
      .createSpy('getShelters')
      .and.returnValue(of({ shelters: [] })),
  };

  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterListComponent,TranslateModule.forRoot()],
      providers: [
        { provide: ShelterService, useValue: shelterServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShelterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load shelters successfully', () => {
    const mockShelters = [{ id: '1', slug: 'shelter-1' }] as Shelter[];
    (shelterServiceMock.getShelters as jasmine.Spy).and.returnValue(
      of({ shelters: mockShelters })
    );

    // Створюємо новий компонент для ініціалізації toSignal
    fixture = TestBed.createComponent(ShelterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.shelters()).toEqual(mockShelters);
    expect(component.error()).toBeNull();
  });

  it('should handle error when loading shelters', () => {
    (shelterServiceMock.getShelters as jasmine.Spy).and.returnValue(
      throwError(() => new Error('fail'))
    );

    fixture = TestBed.createComponent(ShelterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.shelters()).toEqual([]);
    expect(component.error()).toBe('FAILED_TO_LOAD_SHELTERS');
  });

  it('should navigate to shelter detail on visitShelter', () => {
    const shelter = { slug: 'shelter-1' } as Shelter;
    component.visitShelter(shelter);
    expect(routerMock.navigate).toHaveBeenCalledWith([
      '/shelters',
      'shelter-1',
    ]);
  });
});
