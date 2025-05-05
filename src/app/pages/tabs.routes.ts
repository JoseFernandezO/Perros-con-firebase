// src/app/pages/tabs/tabs.routes.ts
import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('../home/home.page').then(m => m.HomePage)
      },
      {
        path: 'tab2',
        loadComponent: () => import('../pet-detail/pet-detail.page').then(m => m.PetDetailPage)
      },
      {
        path: 'tab3',
        loadComponent: () => import('../favorites/favorites.page').then(m => m.FavoritesPage)
      },
      {
        path: 'pet/:id',
        loadComponent: () => import('../pet-detail/pet-detail.page').then(m => m.PetDetailPage)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];