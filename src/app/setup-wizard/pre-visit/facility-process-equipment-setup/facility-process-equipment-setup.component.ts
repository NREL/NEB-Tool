import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faArrowsSpin, faChevronLeft, faChevronRight, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-facility-process-equipment-setup',
  templateUrl: './facility-process-equipment-setup.component.html',
  styleUrl: './facility-process-equipment-setup.component.css'
})
export class FacilityProcessEquipmentSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;

  constructor(private router: Router) {

  }


  goBack() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }

  goToNext() {
    this.router.navigateByUrl('/setup-wizard/pre-assessment');
  }
}
