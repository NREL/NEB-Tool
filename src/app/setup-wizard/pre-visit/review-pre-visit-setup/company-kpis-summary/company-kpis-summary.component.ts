import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
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
  constructor(private companyIdbService: CompanyIdbService, private contactsIdbService: ContactIdbService){

  }

  ngOnInit(){
    this.keyPerformanceIndicators = this.companyIdbService.selectedCompany.getValue().keyPerformanceIndicators;
    this.contacts = this.contactsIdbService.contacts.getValue();
  }
}
