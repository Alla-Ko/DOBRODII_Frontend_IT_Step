import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsPreviewComponent } from './animals-preview.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AnimalsPreviewComponent', () => {
  let component: AnimalsPreviewComponent;
  let fixture: ComponentFixture<AnimalsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsPreviewComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
