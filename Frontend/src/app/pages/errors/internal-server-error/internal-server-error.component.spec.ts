import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServerErrorComponent } from './internal-server-error.component';
import { TranslateModule } from '@ngx-translate/core';

describe('InternalServerErrorComponent', () => {
  let component: InternalServerErrorComponent;
  let fixture: ComponentFixture<InternalServerErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalServerErrorComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalServerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
