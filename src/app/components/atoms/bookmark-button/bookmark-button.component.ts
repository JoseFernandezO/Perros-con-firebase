import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bookmark-button',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.scss']
})
export class BookmarkButtonComponent {
  @Input() isBookmarked: boolean = false;
  @Output() bookmarkChange = new EventEmitter<boolean>();

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    this.bookmarkChange.emit(this.isBookmarked);
    console.log(`Bookmark state: ${this.isBookmarked}`); 
  }
}