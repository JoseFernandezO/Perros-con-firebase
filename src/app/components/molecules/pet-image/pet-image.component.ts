import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkButtonComponent } from '../../atoms/bookmark-button/bookmark-button.component';

@Component({
  selector: 'app-pet-image',
  standalone: true,
  imports: [CommonModule, BookmarkButtonComponent],
  templateUrl: './pet-image.component.html',
  styleUrls: ['./pet-image.component.scss']
})
export class PetImageComponent {
  @Input() imageUrl: string = '';
  @Input() isBookmarked: boolean = false;
  @Output() bookmarkChange = new EventEmitter<boolean>();
}