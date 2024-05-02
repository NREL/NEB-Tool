import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { SetupWizardService } from '../../setup-wizard.service';
import { IconDefinition, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-kpi-setup',
  templateUrl: './company-kpi-setup.component.html',
  styleUrl: './company-kpi-setup.component.css'
})
export class CompanyKpiSetupComponent {

  faChartBar: IconDefinition = faChartBar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  company: IdbCompany;

  constructor(private setupWizardService: SetupWizardService, private router: Router) {

  }

  ngOnInit() {
    this.company = this.setupWizardService.company.getValue();
    if (!this.company) {
      this.setupWizardService.initializeDataForDev();
      this.company = this.setupWizardService.company.getValue();
    }
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/company-contacts');
  }

  goToContacts() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }
}
