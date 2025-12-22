import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCollectionsComponent } from './photo-collections.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PhotoCollectionsComponent', () => {
  let component: PhotoCollectionsComponent;
  let fixture: ComponentFixture<PhotoCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCollectionsComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
