import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Dog } from '../../interfaces/pet.interface';
import { FavoritesService } from '../../services/favorites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DogCardComponent implements OnInit {
  @Input() dog!: Dog;
  @Input() showActions: boolean = true;
  
  isFavorite: boolean = false;

  constructor(private favoritesService: FavoritesService) {
    addIcons({ heart, heartOutline });
  }

  ngOnInit() {
    this.checkFavoriteStatus();
  }

  async checkFavoriteStatus() {
    this.isFavorite = await this.favoritesService.isFavorite(this.dog.id);
  }

  async toggleFavorite(event: Event) {
    event.stopPropagation();
    await this.favoritesService.toggleFavorite(this.dog);
    this.isFavorite = await this.favoritesService.isFavorite(this.dog.id);
  }
}