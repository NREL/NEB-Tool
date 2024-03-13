import { Component } from '@angular/core';
import { IconDefinition, faBuilding, faGears } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-company-dashboard-tabs',
  templateUrl: './company-dashboard-tabs.component.html',
  styleUrl: './company-dashboard-tabs.component.css'
})
export class CompanyDashboardTabsComponent {


  faBuilding: IconDefinition = faBuilding;
  faGears: IconDefinition = faGears;

  company: IdbCompany;
  copmanySub: Subscription;

  constructor(private companyIdbService: CompanyIdbService){

  }

  ngOnInit(){
    this.copmanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
  }

  ngOnDestroy(){
    this.copmanySub.unsubscribe();
  }
}
