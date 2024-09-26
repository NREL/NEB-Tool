import { Component } from '@angular/core';
import { faFolderOpen, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IdbOnSiteVisit } from '../models/onSiteVisit';
import { Subscription } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { IdbCompany } from '../models/company';
import { OnSiteVisitIdbService } from '../indexed-db/on-site-visit-idb.service';
import { FacilityIdbService } from '../indexed-db/facility-idb.service';
import { CompanyIdbService } from '../indexed-db/company-idb.service';

@Component({
  selector: 'app-user-portfolio',
  templateUrl: './user-portfolio.component.html',
  styleUrl: './user-portfolio.component.css'
})
export class UserPortfolioComponent {

  faFolderOpen: IconDefinition = faFolderOpen;


  onSiteVisits: Array<IdbOnSiteVisit>;
  onSiteVisitSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;
  constructor(
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService
  ) {

  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(visits => {
      this.onSiteVisits =  visits;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(facilities => {
      this.facilities = facilities;
    });

    this.companiesSub = this.companyIdbService.companies.subscribe(companies => {
      this.companies = companies;
    })
  }

  ngOnDestroy(){
    this.onSiteVisitSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.companiesSub.unsubscribe();
  }
}
