// src/app/services/pet.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Pet } from '../components/organisms/pet-card/pet-card.component';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  private readonly STORAGE_KEY = 'favorite_pets';
  private _storage: Storage | null = null;
  private isStorageReady = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    try {
      const storage = await this.storage.create();
      this._storage = storage;
      this.isStorageReady = true;
    } catch (error) {
      console.error('Error initializing storage:', error);
      this.isStorageReady = false;
    }
    
    // Cargar mascotas de prueba inmediatamente
    this.loadMockPets();
    
    // Intentar cargar favoritos si el storage está disponible
    if (this.isStorageReady) {
      this.loadFavorites();
    }
  }

  getAllPets(): Observable<Pet[]> {
    return this.petsSubject.asObservable();
  }

  getById(id: string): Pet | undefined {
    return this.petsSubject.value.find(pet => pet.id === id);
  }

  private loadMockPets(): void {
    const mockPets: Pet[] = [
      {
        id: '1',
        name: 'Glivo',
        breed: 'Bulldog Francés',
        age: 2,
        gender: 'male',
        weight: '12 Kg',
        trait: 'Energético',
        imageUrl: 'https://images.unsplash.com/photo-1561754050-9a1ee0470c73?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        isBookmarked: false,
        description: 'Glivo es un bulldog francés muy juguetón y cariñoso. Adora los paseos largos y dormir en el sofá.',
        attributes: ['Bulldog', 'Pasivo', 'Mucha Energía', 'Vacunado', 'Entrenado', 'Con pasaporte']
      },
      {
        id: '2',
        name: 'Penny',
        breed: 'Caniche',
        age: 1,
        gender: 'female',
        weight: '2.5 Kg',
        trait: 'Energética',
        imageUrl: 'https://images.unsplash.com/photo-1652342516868-50eac8c9af0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        isBookmarked: false,
        description: 'Penny es una perrita muy dulce a la que le encanta ir al parque y jugar con otras mascotas. También le encanta que la bañen. Le encantan las croquetas.',
        attributes: ['Caniche', 'Pasivo', 'Mucha Energía', 'Vacunado', 'Entrenado', 'Con pasaporte']
      },
      {
        id: '3',
        name: 'Terry',
        breed: 'Basenji',
        age: 0.2, // 2 meses
        gender: 'male',
        weight: '4 Kg',
        trait: 'Tranquilo',
        imageUrl: 'https://images.unsplash.com/photo-1644036985228-b3535a466292?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        isBookmarked: false,
        description: 'Terry es un cachorro de Basenji tranquilo y curioso. Está aprendiendo a socializar con otros perros.',
        attributes: ['Tranquilo', 'Curioso', 'Cachorro']
      },
      {
        id: '4',
        name: 'Taly',
        breed: 'Maine Coon',
        age: 1, // 3 meses
        gender: 'female',
        weight: '2 Kg',
        trait: 'Independiente',
        imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80',
        isBookmarked: false,
        description: 'Taly es una gatita Maine Coon juguetona y curiosa. Le encanta explorar y jugar con juguetes interactivos.',
        attributes: ['Juguetona', 'Curiosa', 'Independiente']
      },
      {
        id: '5',
        name: 'Max',
        breed: 'Labrador Retriever',
        age: 3,
        gender: 'male',
        weight: '30 Kg',
        trait: 'Energético',
        imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=762&q=80',
        isBookmarked: false,
        description: 'Max es un labrador muy activo y leal. Le encanta nadar y jugar a buscar pelotas.',
        attributes: ['Labrador', 'Activo', 'Entrenado', 'Vacunado', 'Amigable']
      }
    ];
    
    this.petsSubject.next(mockPets);
  }

  async toggleFavorite(petId: string, isFavorite: boolean) {
    if (!this.isStorageReady) {
      console.warn('Storage no está disponible, operación de favoritos solo en memoria');
      // Actualizar solo en memoria
      const pets = [...this.petsSubject.value];
      const petIndex = pets.findIndex(p => p.id === petId);
      
      if (petIndex !== -1) {
        pets[petIndex] = {
          ...pets[petIndex],
          isBookmarked: isFavorite
        };
        
        this.petsSubject.next(pets);
      }
      return;
    }
    
    // Si storage está disponible, actualizar también en storage
    const pets = [...this.petsSubject.value];
    const petIndex = pets.findIndex(p => p.id === petId);
    
    if (petIndex !== -1) {
      pets[petIndex] = {
        ...pets[petIndex],
        isBookmarked: isFavorite
      };
      
      this.petsSubject.next(pets);
      
      // Actualizar storage
      const favoriteIds = pets.filter(p => p.isBookmarked).map(p => p.id);
      await this._storage?.set(this.STORAGE_KEY, favoriteIds);
    }
  }

  async isFavorite(petId: string): Promise<boolean> {
    if (!this.isStorageReady) {
      // Si no hay storage, verificar en memoria
      const pet = this.petsSubject.value.find(p => p.id === petId);
      return pet?.isBookmarked || false;
    }
    
    const favoriteIds = await this._storage?.get(this.STORAGE_KEY) || [];
    return favoriteIds.includes(petId);
  }

  async getFavorites(): Promise<Pet[]> {
    if (!this.isStorageReady) {
      // Si no hay storage, retornar favoritos de memoria
      return this.petsSubject.value.filter(pet => pet.isBookmarked);
    }
    
    const favoriteIds = await this._storage?.get(this.STORAGE_KEY) || [];
    return this.petsSubject.value.filter(pet => favoriteIds.includes(pet.id));
  }

  private async loadFavorites() {
    if (!this.isStorageReady) return;
    
    const favoriteIds = await this._storage?.get(this.STORAGE_KEY) || [];
    const updatedPets = this.petsSubject.value.map(pet => ({
      ...pet,
      isBookmarked: favoriteIds.includes(pet.id)
    }));
    
    this.petsSubject.next(updatedPets);
  }
}