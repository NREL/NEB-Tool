import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review-pre-visit-setup',
  templateUrl: './review-pre-visit-setup.component.html',
  styleUrl: './review-pre-visit-setup.component.css'
})
export class ReviewPreVisitSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faCircleCheck: IconDefinition = faCircleCheck;

  constructor(private router: Router) {

  }


  goBack() {
    this.router.navigateByUrl('/setup-wizard/process-equipment');
  }

  goToFacilitySetup() {
    this.router.navigateByUrl('/setup-wizard/review-pre-visit');
  }
}
