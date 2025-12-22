import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallShareButtonComponent } from './small-share-button.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SmallShareButtonComponent', () => {
  let component: SmallShareButtonComponent;
  let fixture: ComponentFixture<SmallShareButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallShareButtonComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallShareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
