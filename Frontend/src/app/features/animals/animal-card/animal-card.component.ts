import { CommonModule, LowerCasePipe } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Animal } from '../../../core/models/animal';
import { PrimaryLargeButtonComponent } from '../../../shared/components/buttons/blue/primary-large-button.component';
import { RoundFilledWhiteBlueButtonWithIconComponent } from '../../../shared/components/buttons/round-filled-white-blue-button-with-icon.component';
import { RoundWhiteBlueButtonWithIconComponent } from '../../../shared/components/buttons/round-white-blue-button-with-icon.component';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [
    PrimaryLargeButtonComponent,
    CommonModule,
    TranslateModule,
    LowerCasePipe,
    RoundWhiteBlueButtonWithIconComponent,
    RoundFilledWhiteBlueButtonWithIconComponent,
  ],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.css',
})
export class AnimalCardComponent {
  animal = input.required<Animal>();
  @Output() animalDetailClick = new EventEmitter();
  @Output() heartClick = new EventEmitter();
  getStatusText(status?: string) {
    return (status || '').toUpperCase();
  }
  getStatusClass(status?: string) {
    const s = status?.toLowerCase();
    return {
      'bg-primary-blue text-white': s === 'available',
      'bg-secondary-jordyBlue-1 text-primary-blue': s !== 'available',
    };
  }


  onAnimalDetailClick() {
    this.animalDetailClick.emit();
  }

  onHeartClick() {
    this.heartClick.emit(this.animal());
  }

  onFilledHeartClick() {
    this.heartClick.emit(this.animal());
  }
}
