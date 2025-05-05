import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.html',
  styleUrls: ['./favorite.scss']
})
export class FavoriteComponent implements OnInit {
  isFavorite: boolean = false; 
  items: any[] = []; 

  constructor() {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
   
    this.items = [
      { id: 1, name: 'Item 1', isFavorite: false },
      { id: 2, name: 'Item 2', isFavorite: true },
      { id: 3, name: 'Item 3', isFavorite: false },
    ];
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite; 
  }

  getFavoriteItems(): any[] {
    return this.items.filter(item => item.isFavorite); 
  }
}