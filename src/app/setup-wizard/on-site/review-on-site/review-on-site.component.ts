import { Component } from '@angular/core';
import { IconDefinition, faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review-on-site',
  templateUrl: './review-on-site.component.html',
  styleUrl: './review-on-site.component.css'
})
export class ReviewOnSiteComponent {

  faSave: IconDefinition = faSave;
  faChevronLeft: IconDefinition = faChevronLeft;

  constructor() {

  }

  goBack() {

  }

  submitData() {

  }
}
