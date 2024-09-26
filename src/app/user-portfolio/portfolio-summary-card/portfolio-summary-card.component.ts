import { Component } from '@angular/core';
import { faList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-portfolio-summary-card',
  templateUrl: './portfolio-summary-card.component.html',
  styleUrl: './portfolio-summary-card.component.css'
})
export class PortfolioSummaryCardComponent {

  faList: IconDefinition = faList;

  onSiteVisits: Array<IdbOnSiteVisit>;
  onSiteVisitSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  constructor(
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {

  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(visits => {
      this.onSiteVisits = visits;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(facilities => {
      this.facilities = facilities;
    });

    this.companiesSub = this.companyIdbService.companies.subscribe(companies => {
      this.companies = companies;
    });

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(assessments => {
      this.assessments = assessments;
    });
  }

  ngOnDestroy(){
    this.onSiteVisitSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.companiesSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
  }
}
