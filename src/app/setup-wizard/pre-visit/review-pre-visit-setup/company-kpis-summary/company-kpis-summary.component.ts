import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceIndicator } from 'src/app/shared/constants/keyPerformanceIndicators';

@Component({
  selector: 'app-company-kpis-summary',
  templateUrl: './company-kpis-summary.component.html',
  styleUrl: './company-kpis-summary.component.css'
})
export class CompanyKpisSummaryComponent {

  keyPerformanceIndicators: Array<KeyPerformanceIndicator>;
  faChartBar: IconDefinition = faChartBar;
  faBullseye: IconDefinition = faBullseye;
  faUser: IconDefinition = faUser;
  contacts: Array<IdbContact>;
  constructor(private setupWizardService: SetupWizardService){

  }

  ngOnInit(){
    this.keyPerformanceIndicators = this.setupWizardService.company.getValue().keyPerformanceIndicators;
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
