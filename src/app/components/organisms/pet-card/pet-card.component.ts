// src/app/components/organisms/pet-card/pet-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline, male, female, flashOutline } from 'ionicons/icons';

export interface Pet {
  id: string;
  name: string;
  gender: 'male' | 'female';
  breed: string;
  age: number;
  trait: string;
  imageUrl: string;
  isBookmarked: boolean;
  weight?: string;
  description?: string;
  attributes?: string[];
}

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent {
  @Input() pet!: Pet;
  @Output() bookmark = new EventEmitter<{ id: string; bookmarked: boolean }>();
  @Output() cardClick = new EventEmitter<string>();

  constructor() {
    addIcons({ heart, heartOutline, male, female, flashOutline });
  }

  displayAge(age: number): string {
    if (age < 1) {
      return `${Math.round(age * 12)} meses de edad`;
    }
    return `${age} ${age === 1 ? 'año' : 'años'}`;
  }

  onBookmarkClick(event: Event) {
    event.stopPropagation(); // Evitar que se propague al card
    this.bookmark.emit({ id: this.pet.id, bookmarked: !this.pet.isBookmarked });
  }

  onCardClick() {
    this.cardClick.emit(this.pet.id);
  }

  getImageUrl(): string {
    // Verificar si la URL es relativa a assets o es una URL completa
    if (this.pet.imageUrl && this.pet.imageUrl.includes('assets/')) {
      return this.pet.imageUrl;
    } else if (this.pet.id === '1' || this.pet.id === '2') {
      // Para los primeros dos perros, usar las imágenes disponibles
      return `assets/images/dog${this.pet.id}.jpg`;
    } else {
      // Para los demás, usar una ruta predeterminada
      return 'assets/images/dog1.jpg';
    }
  }
}