// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/tab1',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      },
      {
        path: 'tab3',
        loadComponent: () => import('./favorites/favorites.page').then(m => m.FavoritesPage)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'pet-detail/:id',
    loadComponent: () => import('./pet-detail/pet-detail.page').then(m => m.PetDetailPage)
  }
];