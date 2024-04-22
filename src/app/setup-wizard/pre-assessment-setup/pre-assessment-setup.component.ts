import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faListCheck, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pre-assessment-setup',
  templateUrl: './pre-assessment-setup.component.html',
  styleUrl: './pre-assessment-setup.component.css'
})
export class PreAssessmentSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faListCheck: IconDefinition = faListCheck;

  constructor(private router: Router) {

  }


  goBack() {
    this.router.navigateByUrl('/setup-wizard/process-equipment');
  }

  goToNext() {
    this.router.navigateByUrl('/setup-wizard/review-pre-visit');
  }
}
