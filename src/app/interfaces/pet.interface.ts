// src/app/interfaces/pet.interface.ts
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  sex: 'male' | 'female';
  weight: string;
  imageUrl: string;
  energyLevel: 'high' | 'medium' | 'low';
  description: string;
  attributes: string[];
  isBookmarked?: boolean;
  trait?: string;
}