import { Component } from '@angular/core';
import { IconDefinition, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-company-details-summary',
  templateUrl: './company-details-summary.component.html',
  styleUrl: './company-details-summary.component.css'
})
export class CompanyDetailsSummaryComponent {

  company: IdbCompany;
  contacts: Array<IdbContact>;
  faBuilding: IconDefinition = faBuilding;
  constructor(private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.company = this.setupWizardService.company.getValue();
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
