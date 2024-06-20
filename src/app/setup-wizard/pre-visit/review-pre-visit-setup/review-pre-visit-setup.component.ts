import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faCircleCheck, faFilePdf, faSave } from '@fortawesome/free-solid-svg-icons';
import { IdbCompany } from 'src/app/models/company';
import { SetupWizardContext, SetupWizardService } from '../../setup-wizard.service';
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
  displayConfirmModal: boolean = false;
  setupContext: SetupWizardContext;
  constructor(private router: Router, private onSiteVisitIdbService: OnSiteVisitIdbService,
    private setupWizardService: SetupWizardService,
    private companyIdbService: CompanyIdbService
  ) {
  }

  ngOnInit() {
    this.setupContext = this.setupWizardService.setupContext.getValue();
    this.company = this.companyIdbService.selectedCompany.getValue();
    if(!this.company){
      this.router.navigateByUrl('/setup-wizard');
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

  openConfirmModal() {
    if(this.setupContext != 'onSite'){
      this.continue();
    }else{
      this.displayConfirmModal = true;
    }
  }

  closeConfirmModal() {
    this.displayConfirmModal = false;
  }

}
