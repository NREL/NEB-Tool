import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faCircleCheck, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { IdbCompany } from 'src/app/models/company';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';

@Component({
  selector: 'app-review-pre-visit-setup',
  templateUrl: './review-pre-visit-setup.component.html',
  styleUrl: './review-pre-visit-setup.component.css'
})
export class ReviewPreVisitSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faCircleCheck: IconDefinition = faCircleCheck;
  faFilePdf: IconDefinition = faFilePdf;

  company: IdbCompany;
  constructor(private router: Router, private onSiteVisitIdbService: OnSiteVisitIdbService,
    private companyIdbService: CompanyIdbService
  ) {
  }

  ngOnInit() {
    this.company = this.companyIdbService.selectedCompany.getValue();
    if(!this.company){
      this.router.navigateByUrl('/welcome');
    }
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/pre-assessment');
  }

  continue() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    if(onSiteVisit.assessmentIds.length > 0){
      this.router.navigateByUrl('setup-wizard/data-collection/' + onSiteVisit.guid + '/assessment/' + onSiteVisit.assessmentIds[0]);
    }else{
      this.router.navigateByUrl('setup-wizard/data-collection/' + onSiteVisit.guid + '/manage-assessments');
    }
  }

  goToFacility() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('facility/' + onSiteVisit.facilityId);
  }
}
