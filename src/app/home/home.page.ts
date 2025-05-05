// src/app/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonCard,
  IonItem,
  IonList
} from '@ionic/angular/standalone';
import { PetService } from '../services/pet.service';
import { PetCardComponent, Pet } from '../components/organisms/pet-card/pet-card.component';
import { addIcons } from 'ionicons';
import { heart, heartOutline, search, home, paw, female, male, flashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    IonCard,
    IonItem,
    IonList,
    PetCardComponent
  ]
})
export class HomePage implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'todos';

  constructor(
    private petService: PetService,
    private router: Router
  ) {
    addIcons({ 
      heart, 
      heartOutline, 
      search, 
      home, 
      paw, 
      female, 
      male, 
      flashOutline 
    });
  }

  ngOnInit() {
    this.loadPets();
  }

  ionViewWillEnter() {
    this.loadPets();
  }

  loadPets() {
    this.petService.getAllPets().subscribe(pets => {
      console.log('Mascotas cargadas:', pets);
      this.pets = pets;
      this.applyFilters();
    });
  }

  applyFilters() {
    console.log('Aplicando filtros, mascotas totales:', this.pets.length);
    let result = this.pets;
    
    // Aplicar filtro de búsqueda
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(pet => 
        pet.name.toLowerCase().includes(term) || 
        pet.breed.toLowerCase().includes(term) ||
        (pet.trait && pet.trait.toLowerCase().includes(term))
      );
    }
    
    // Aplicar filtro de categoría
    if (this.selectedCategory !== 'todos') {
      if (this.selectedCategory === 'tranquilo') {
        result = result.filter(pet => 
          pet.trait && pet.trait.toLowerCase().includes('tranquil'));
      } else if (this.selectedCategory === 'cachorro') {
        result = result.filter(pet => pet.age < 1);
      } else if (this.selectedCategory === 'energetico') {
        result = result.filter(pet => 
          pet.trait && (
            pet.trait.toLowerCase().includes('energét') || 
            pet.trait.toLowerCase().includes('energic')
          )
        );
      }
    }
    
    this.filteredPets = result;
    console.log('Mascotas filtradas:', this.filteredPets.length);
  }

  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
    this.applyFilters();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  onPetSelected(petId: string) {
    this.router.navigate(['/pet-detail', petId]);
  }

  onBookmarkChange(event: { id: string; bookmarked: boolean }) {
    this.petService.toggleFavorite(event.id, event.bookmarked);
  }
}