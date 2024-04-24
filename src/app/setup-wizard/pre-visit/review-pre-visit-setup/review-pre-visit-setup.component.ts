import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { IdbCompany } from 'src/app/models/company';
import { SetupWizardService } from '../../setup-wizard.service';

@Component({
  selector: 'app-review-pre-visit-setup',
  templateUrl: './review-pre-visit-setup.component.html',
  styleUrl: './review-pre-visit-setup.component.css'
})
export class ReviewPreVisitSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faCircleCheck: IconDefinition = faCircleCheck;

  company: IdbCompany;
  constructor(private router: Router, private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.company = this.setupWizardService.company.getValue();
    if (!this.company) {
      this.setupWizardService.initializeDataForDev();
      this.company = this.setupWizardService.company.getValue();
    }
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/process-equipment');
  }

  goToFacilitySetup() {
    this.router.navigateByUrl('/setup-wizard/review-pre-visit');
  }

  submitPreVisit(){
    
  }
}
