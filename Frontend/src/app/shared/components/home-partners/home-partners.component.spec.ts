import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePartnersComponent } from './home-partners.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HomePartnersComponent', () => {
  let component: HomePartnersComponent;
  let fixture: ComponentFixture<HomePartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePartnersComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
