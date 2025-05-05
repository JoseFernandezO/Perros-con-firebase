import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GenderIconComponent } from '../../atoms/gender-icon/gender-icon.component';
import { PetTraitComponent } from '../../atoms/pet-trait/pet-trait.component';

@Component({
  selector: 'app-pet-info',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    GenderIconComponent,  
    PetTraitComponent   
  ],
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.scss']
})
export class PetInfoComponent {
  @Input() name: string = '';
  @Input() gender: 'male' | 'female' = 'male';
  @Input() breed: string = '';
  @Input() age: number = 0;
  @Input() trait: string = '';

  getTraitIcon(): string {
    const traitLower = this.trait.toLowerCase();
    if (traitLower.includes('energ')) return 'flash';
    if (traitLower.includes('tranq')) return 'moon';
    if (traitLower.includes('amig')) return 'happy';
    return 'paw';
  }
}