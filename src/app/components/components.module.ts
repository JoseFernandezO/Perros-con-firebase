import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DogCardComponent } from './dog-card/dog-card.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DogCardComponent
  ],
  exports: [
    DogCardComponent
  ]
})
export class ComponentsModule { }