import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Animal } from '../../../core/models/animal';
import { AnimalSubscriptionService } from '../../../core/services/animal-subscription.service';
import { AnimalService } from '../../../core/services/animal.service';
import { AuthService } from '../../../core/services/auth.service';
import { ModalService } from '../../../core/services/modal.service';
import { AnimalListComponent } from './animal-list.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AnimalListComponent', () => {
  let component: AnimalListComponent;
  let fixture: ComponentFixture<AnimalListComponent>;

  // Моки сервісів
  const animalServiceMock = {
    getAnimals: jasmine
      .createSpy('getAnimals')
      .and.returnValue(of({ totalCount: 0, animals: [] })),
  };

  const animalSubscriptionServiceMock = {
    getFavoriteAnimals: jasmine
      .createSpy('getFavoriteAnimals')
      .and.returnValue(of([])),
    createAnimalSubscription: jasmine
      .createSpy('createAnimalSubscription')
      .and.returnValue(of({})),
    deleteAnimalSubscription: jasmine
      .createSpy('deleteAnimalSubscription')
      .and.returnValue(of({})),
  };

  const authServiceMock = {
    _currentUser: jasmine.createSpy('_currentUser').and.returnValue(true),
  };

  const modalServiceMock = {
    openModal: jasmine.createSpy('openModal'),
  };

  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  };

  const activatedRouteMock = {
    snapshot: { queryParams: {} },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalListComponent,TranslateModule.forRoot()],
      providers: [
        { provide: AnimalService, useValue: animalServiceMock },
        {
          provide: AnimalSubscriptionService,
          useValue: animalSubscriptionServiceMock,
        },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch animals on init', () => {
    expect(animalServiceMock.getAnimals).toHaveBeenCalled();
    expect(component.totalCount()).toBe(0);
    expect(component.displayedAnimals()).toEqual([]);
  });

  it('should toggle filters', () => {
    const initial = component.filtersOpen();
    component.toggleFilters();
    expect(component.filtersOpen()).toBe(!initial);
  });

  it('should open modal if user not logged in and clicks heart', () => {
    (authServiceMock._currentUser as jasmine.Spy).and.returnValue(false);
    const animal = { id: '1', slug: 'a' } as Animal;

    component.onHeartClick(animal);

    expect(modalServiceMock.openModal).toHaveBeenCalledWith('welcome');
    expect(
      animalSubscriptionServiceMock.createAnimalSubscription
    ).not.toHaveBeenCalled();
  });

  it('should call subscription service when user clicks heart and is logged in', () => {
    (authServiceMock._currentUser as jasmine.Spy).and.returnValue(true);
    const animal = { id: '1', slug: 'a' } as Animal;

    component.onHeartClick(animal);

    expect(
      animalSubscriptionServiceMock.createAnimalSubscription
    ).toHaveBeenCalledWith('1');
    expect(modalServiceMock.openModal).not.toHaveBeenCalled();
  });

  it('should call delete subscription if animal already favorite', () => {
    (authServiceMock._currentUser as jasmine.Spy).and.returnValue(true);

    const animal = { id: '1', slug: 'a' } as Animal;
    component['favoriteAnimalIds'].set(new Set(['1']));

    component.onHeartClick(animal);

    expect(
      animalSubscriptionServiceMock.deleteAnimalSubscription
    ).toHaveBeenCalledWith('1');
  });

  it('should navigate to animal detail', () => {
    const animal = { slug: 'dog-1' } as Animal;
    component.onAnimalDetailClick(animal);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/animals', 'dog-1']);
  });

  it('should change page', () => {
    component.setPage(3);
    expect(component.currentPage()).toBe(3);
  });

  it('should update selected filters', () => {
    component.onSelectionSexChange(['BOY']);
    expect(component.selectedSexOptions()).toEqual(['BOY']);
    expect(component.currentPage()).toBe(1);

    component.onSelectionSizeChange(['BIG']);
    expect(component.selectedSizeOptions()).toEqual(['BIG']);
    expect(component.currentPage()).toBe(1);

    component.onSelectionAgeChange(['UP_TO_1']);
    expect(component.selectedAgeOptions()).toEqual(['UP_TO_1']);
    expect(component.currentPage()).toBe(1);

    component.onSelectionCostChange(['600']);
    expect(component.selectedCostOptions()).toEqual(['600']);
    expect(component.currentPage()).toBe(1);
  });

  it('should toggle boolean filters', () => {
    const initialSterilization = component.sterelisationOptions();
    component.toggleSterilisationOption();
    expect(component.sterelisationOptions()).toBe(!initialSterilization);

    const initialCare = component.availableForCareOptions();
    component.toggleAvailableForCareOption();
    expect(component.availableForCareOptions()).toBe(!initialCare);
  });

  it('should set species filters', () => {
    component.onCatsFilterClick();
    expect(component.selectedSpeciesOptions()).toBe('CAT');

    component.onDogsFilterClick();
    expect(component.selectedSpeciesOptions()).toBe('DOG');

    component.onOtherSpeciesFilterClick();
    expect(component.selectedSpeciesOptions()).toBe('OTHER_SPECIES');

    component.onAllAnimalsFilterClick();
    expect(component.selectedSpeciesOptions()).toBe('ALL_SPECIES');
  });
});
