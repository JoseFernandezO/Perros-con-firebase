// src/app/favorites/favorites.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonIcon
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { PetService } from '../services/pet.service';
import { PetCardComponent, Pet } from '../components/organisms/pet-card/pet-card.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonList,
    IonIcon,
    PetCardComponent
  ]
})
export class FavoritesPage implements OnInit {
  favoritePets: Pet[] = [];

  constructor(
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadFavorites();
  }

  async loadFavorites() {
    this.favoritePets = await this.petService.getFavorites();
  }

  onPetSelected(petId: string) {
    this.router.navigate(['/pet-detail', petId]);
  }

  async onBookmarkChange(event: { id: string; bookmarked: boolean }) {
    const pet = this.favoritePets.find(p => p.id === event.id);
    if (pet) {
      await this.petService.toggleFavorite(event.id, event.bookmarked);
      this.loadFavorites();
    }
  }
}