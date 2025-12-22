import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaComponent } from './social-media.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SocialMediaComponent', () => {
  let component: SocialMediaComponent;
  let fixture: ComponentFixture<SocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaComponent,TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
