import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { male, female } from 'ionicons/icons';

@Component({
  selector: 'app-gender-icon',
  standalone: true,
  imports: [IonicModule],
  template: `
    <ion-icon 
      [name]="gender === 'male' ? 'male' : 'female'"
      [color]="gender === 'male' ? 'primary' : 'danger'"
      aria-hidden="true"
      class="gender-icon">
    </ion-icon>
  `,
  styles: [`
    :host {
      display: inline-block;
      margin-left: 8px;
      
      .gender-icon {
        font-size: 20px;
        vertical-align: middle;
      }
    }
  `]
})
export class GenderIconComponent {
  constructor() {
    addIcons({ male, female });
  }

  @Input() gender: 'male' | 'female' = 'male';
}