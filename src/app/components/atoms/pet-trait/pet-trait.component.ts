import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-trait',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pet-trait.component.html',
  styleUrls: ['./pet-trait.component.scss']
})
export class PetTraitComponent {
  @Input() trait: string = '';
  @Input() iconName: string = 'paw';
}