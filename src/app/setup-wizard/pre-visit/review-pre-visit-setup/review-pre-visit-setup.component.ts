import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faCircleCheck, faFilePdf, faSave } from '@fortawesome/free-solid-svg-icons';
import { IdbCompany } from 'src/app/models/company';
import { SetupWizardContext, SetupWizardService } from '../../setup-wizard.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-review-pre-visit-setup',
  templateUrl: './review-pre-visit-setup.component.html',
  styleUrl: './review-pre-visit-setup.component.css'
})
export class ReviewPreVisitSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faCircleCheck: IconDefinition = faCircleCheck;
  faSave: IconDefinition = faSave;

  faFilePdf: IconDefinition = faFilePdf;

  company: IdbCompany;
  facility: IdbFacility;
  assessments: Array<IdbAssessment>;
  contacts: Array<IdbContact>;
  displayConfirmModal: boolean = false;
  setupContext: SetupWizardContext;
  constructor(private router: Router, private onSiteVisitIdbService: OnSiteVisitIdbService,
    private setupWizardService: SetupWizardService
  ) {
  }

  ngOnInit() {
    this.setupContext = this.setupWizardService.setupContext.getValue();
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/pre-assessment');
  }

  continue() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/data-collection/' + onSiteVisit.guid + '/assessment/' + onSiteVisit.assessmentIds[0]);
  }

  goToFacility() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('facility/' + onSiteVisit.facilityId);
  }

  openConfirmModal() {
    this.displayConfirmModal = true;
  }

  closeConfirmModal() {
    this.displayConfirmModal = false;
  }

}
