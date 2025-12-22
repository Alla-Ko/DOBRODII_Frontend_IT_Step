import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-home-partners',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent],
  templateUrl: './home-partners.component.html',
  styleUrl: './home-partners.component.css',
})
export class HomePartnersComponent implements OnInit {
  items = signal<string[]>([
    'PartnersItem1',
    'PartnersItem2',
    'PartnersItem3',
    'PartnersItem4',
    'PartnersItem5',
    'PartnersItem6',
    'PartnersItem7',
  ]);

  visibleCount = signal(4);
  offset = signal(0);
  animating = false;
  platformId = inject(PLATFORM_ID);

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleCount(); 
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleCount(); 
    }
  }
  private updateVisibleCount() {
    const width = window.innerWidth;

    if (width >= 1280) {

      this.visibleCount.set(4);
    } else if (width >= 640) {

      this.visibleCount.set(2);
    } else {

      this.visibleCount.set(1);
    }
  }
  next() {
    const vis = this.visibleCount();

    if (this.animating) return;
    this.animating = true;

    const move = vis === 1 ? 120 : vis === 2 ? 49.3 : 25;
    this.offset.set(-move);
  }

  prev() {
    if (this.animating) return;


    const arr = [...this.items()];
    const last = arr.pop();
    if (last) arr.unshift(last);
    this.items.set(arr);


    const move =
      this.visibleCount() === 1 ? 120 : this.visibleCount() === 2 ? 49.3 : 25;
    this.offset.set(-move);


    setTimeout(() => {
      this.animating = true;
      this.offset.set(0); 
    }, 10);
  }

  onTransitionEnd() {
    this.animating = false;
    const arr = [...this.items()];
    if (this.offset() < 0) {
      const first = arr.shift();
      if (first) arr.push(first);
    } else if (this.offset() > 1) {
      const last = arr.pop();
      if (last) arr.unshift(last);
    }

    this.items.set(arr);



    this.offset.set(0);
  }
}
