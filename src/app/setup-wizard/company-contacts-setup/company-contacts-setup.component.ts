import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faAddressBook, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-contacts-setup',
  templateUrl: './company-contacts-setup.component.html',
  styleUrl: './company-contacts-setup.component.css'
})
export class CompanyContactsSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faAddressBook: IconDefinition = faAddressBook;

  constructor(private router: Router) {

  }


  goBack() {
    this.router.navigateByUrl('/setup-wizard/company-kpi');
  }

  goToFacilitySetup() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }

}
