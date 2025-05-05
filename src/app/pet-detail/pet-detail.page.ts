// src/app/pet-detail/pet-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonChip,
  IonLabel,
  NavController
} from '@ionic/angular/standalone';
import { PetService } from '../services/pet.service';
import { Pet } from '../components/organisms/pet-card/pet-card.component';
import { addIcons } from 'ionicons';
import { 
  heart, 
  heartOutline, 
  arrowBack, 
  paw,
  flash,
  medkit,
  checkmarkCircle,
  shieldCheckmark,
  globe,
  ribbon,
  checkboxOutline,
  briefcaseOutline,
  documentTextOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.page.html',
  styleUrls: ['./pet-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonChip,
    IonLabel
  ]
})
export class PetDetailPage implements OnInit {
  pet?: Pet;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private navCtrl: NavController
  ) {
    addIcons({ 
      heart, 
      heartOutline, 
      arrowBack, 
      paw, 
      flash,
      medkit,
      checkmarkCircle,
      shieldCheckmark,
      globe,
      ribbon,          // Para razas
      checkboxOutline, // Para "Entrenado"
      briefcaseOutline, // Para "Con pasaporte"
      documentTextOutline // Para otros atributos
    });
  }

  ngOnInit() {
    this.loadPet();
  }

  ionViewWillEnter() {
    this.loadPet();
  }

  loadPet() {
    const petId = this.route.snapshot.paramMap.get('id');
    if (petId) {
      this.pet = this.petService.getById(petId);
      if (this.pet) {
        this.isFavorite = this.pet.isBookmarked;
      }
    }
  }

  getIconForAttribute(attribute: string): string {
    const attr = attribute.toLowerCase();
    if (attr.includes('caniche') || attr.includes('bulldog') || attr.includes('basenji') || attr.includes('labrador')) 
      return 'ribbon';
    if (attr.includes('energía') || attr.includes('energet')) 
      return 'flash';
    if (attr.includes('pasiv') || attr.includes('tranquil')) 
      return 'paw';
    if (attr.includes('vacun')) 
      return 'medkit';
    if (attr.includes('entrena')) 
      return 'checkbox-outline';
    if (attr.includes('pasaporte')) 
      return 'briefcase-outline';
    return 'shield-checkmark';
  }

  async toggleFavorite() {
    if (this.pet) {
      this.isFavorite = !this.isFavorite;
      await this.petService.toggleFavorite(this.pet.id, this.isFavorite);
    }
  }

  formatAge(age: number): string {
    if (age < 1) {
      // Redondear los meses para evitar decimales
      const months = Math.round(age * 12);
      return `${months} meses`;
    } else {
      return `${age} año${age > 1 ? 's' : ''}`;
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  onMatch() {
    console.log('Match con:', this.pet?.name);
  }
}