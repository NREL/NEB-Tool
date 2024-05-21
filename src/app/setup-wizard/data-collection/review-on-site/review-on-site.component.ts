import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';

@Component({
  selector: 'app-review-on-site',
  templateUrl: './review-on-site.component.html',
  styleUrl: './review-on-site.component.css'
})
export class ReviewOnSiteComponent {

  faChevronLeft: IconDefinition = faChevronLeft;  
  displayConfirmModal: boolean = false;
  setupContext: SetupWizardContext;
  onSiteVisit: IdbOnSiteVisit;
  constructor(private router: Router,
    private setupWizardService: SetupWizardService,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {
  }

  ngOnInit() {
    this.setupContext = this.setupWizardService.setupContext.getValue();
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.onSiteVisit.assessmentIds[this.onSiteVisit.assessmentIds.length - 1]);
  }

  finishDataCollection() {
    if (this.setupContext == 'onSite') {
      this.router.navigateByUrl('/facility/' + this.onSiteVisit.facilityId);
    } else if (this.setupContext == 'full') {
      this.router.navigateByUrl('/setup-wizard/review-setup/');
    }
  }

  openConfirmModal() {
    this.displayConfirmModal = true;
  }

  closeConfirmModal() {
    this.displayConfirmModal = false;
  }
}
