import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { SetupWizardService } from '../../setup-wizard.service';
import { IconDefinition, faBuilding, faChevronRight, faContactCard, faFilePen, faGear, faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrl: './company-setup.component.css'
})
export class CompanySetupComponent {

  companyName: string;
  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faBuilding: IconDefinition = faBuilding;
  faChevronRight: IconDefinition = faChevronRight;

  constructor(private setupWizardService: SetupWizardService, private router: Router) {

  }

  ngOnInit() {
    let newCompany: IdbCompany = this.setupWizardService.company.getValue();
    if (!newCompany) {
      this.setupWizardService.initializeDataForDev();
      newCompany = this.setupWizardService.company.getValue();
    }
    this.companyName = newCompany.generalInformation.name;
    this.setupWizardService.company.next(newCompany);
  }

  goToContacts() {
    this.router.navigateByUrl('setup-wizard/company-contacts')
  }

  saveChanges() {
    let selectedCompany: IdbCompany = this.setupWizardService.company.getValue();
    selectedCompany.generalInformation.name = this.companyName;
    this.setupWizardService.company.next(selectedCompany);
  }
}
