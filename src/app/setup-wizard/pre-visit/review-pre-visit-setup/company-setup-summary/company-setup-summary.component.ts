import { Component } from '@angular/core';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-company-setup-summary',
  templateUrl: './company-setup-summary.component.html',
  styleUrl: './company-setup-summary.component.css'
})
export class CompanySetupSummaryComponent {

  company: IdbCompany;
  contacts: Array<IdbContact>;
  constructor(private setupWizardService: SetupWizardService){

  }

  ngOnInit(){
    this.company = this.setupWizardService.company.getValue();
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
