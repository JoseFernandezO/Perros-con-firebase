    // src/app/models/pet.model.ts
    export interface Pet {
      id: string;
      name: string;
      breed: string;
      age: number;
      energyLevel: 'low' | 'medium' | 'high';
      gender: 'male' | 'female';
      trait: string[];              // por ejemplo ['juguetón','sociable']
      // … cualquier otro campo común
    }
