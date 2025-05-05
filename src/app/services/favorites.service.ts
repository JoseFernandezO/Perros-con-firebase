import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Pet } from '../interfaces/pet.interface';
import { PetService } from './pet.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Pet[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();
  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = 'favorite_dogs';

  constructor(
    private storage: Storage, 
    private petService: PetService
  ) {
    this.init();
  }

  async init() {
    // Inicializar storage
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  getFavorites(): Observable<Pet[]> {
    return this.favorites$;
  }

  async loadFavorites() {
    if (this._storage) {
      const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
      const allPets = await this.petService.pets$.toPromise();
      
      if (allPets) {
        const favoriteDogs = allPets.filter(pet => favoriteIds.includes(pet.id));
        this.favoritesSubject.next(favoriteDogs);
      }
    }
  }

  async toggleFavorite(pet: Pet) {
    if (!this._storage) return;
    
    const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
    const index = favoriteIds.indexOf(pet.id);
    
    if (index > -1) {
      // Eliminar de favoritos
      favoriteIds.splice(index, 1);
    } else {
      // Añadir a favoritos
      favoriteIds.push(pet.id);
    }
    
    await this._storage.set(this.STORAGE_KEY, favoriteIds);
    await this.loadFavorites();
  }

  async isFavorite(dogId: number): Promise<boolean> {
    if (!this._storage) return false;
    
    const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
    return favoriteIds.includes(dogId);
  }
}