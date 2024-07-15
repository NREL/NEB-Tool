import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faPlus, faScrewdriverWrench, faToolbox, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { IdbFacility } from 'src/app/models/facility';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { Subscription, firstValueFrom } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';

@Component({
  selector: 'app-pre-assessment-setup',
  templateUrl: './pre-assessment-setup.component.html',
  styleUrl: './pre-assessment-setup.component.css'
})
export class PreAssessmentSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faToolbox: IconDefinition = faToolbox;
  faPlus: IconDefinition = faPlus;
  faTrash: IconDefinition = faTrash;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  accordionIndex: number = 0;
  processEquipmentOptions: Array<ProcessEquipment>;
  displayDeleteModal: boolean = false;
  assessmentToDelete: IdbAssessment;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;
  isFormChange: boolean = false;
  constructor(private router: Router, private assessmentIdbService: AssessmentIdbService,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private dbChangesService: DbChangesService
  ) {
  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_onSiteVisit => {
      this.onSiteVisit = _onSiteVisit;
    });

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      if (!this.isFormChange) {
        this.assessments = _assessments;
      } else {
        this.isFormChange = false;
      }
    });

    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    if (facility) {
      this.processEquipmentOptions = facility.processEquipment;
    } else {
      this.router.navigateByUrl('/welcome');
    }
  }

  ngOnDestroy() {
    this.onSiteVisitSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
  }
  
  async saveChanges(assessment: IdbAssessment) {
    this.isFormChange = true;
    this.assessmentIdbService.asyncUpdate(assessment);
  }

  setAccordionIndex(index: number) {
    this.accordionIndex = index;
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/process-equipment');
  }

  goToNext() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/review-pre-visit');
  }

  async addAssessment() {
    let assessment: IdbAssessment = getNewIdbAssessment(this.onSiteVisit.userId, this.onSiteVisit.companyId, this.onSiteVisit.facilityId);
    assessment.visitDate = this.onSiteVisit.visitDate;
    await firstValueFrom(this.assessmentIdbService.addWithObservable(assessment));
    await this.assessmentIdbService.setAssessments();
    this.onSiteVisit.assessmentIds.push(assessment.guid);
    await this.onSiteVisitIdbService.asyncUpdate(this.onSiteVisit);
    this.setAccordionIndex(this.onSiteVisit.assessmentIds.length - 1);
  }

  openDeleteModal(assessment: IdbAssessment) {
    this.assessmentToDelete = assessment;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.assessmentToDelete = undefined;
  }

  async removeAssessment() {
    await this.dbChangesService.deleteAssessment(this.assessmentToDelete);
    this.closeDeleteModal();
    this.setAccordionIndex(0);
  }

  async setVisitDate() {
    for (let i = 0; i < this.assessments.length; i++) {
      if (this.onSiteVisit.assessmentIds.includes(this.assessments[i].guid)) {
        this.assessments[i].visitDate = this.onSiteVisit.visitDate;
        await this.saveChanges(this.assessments[i]);
      }
    }
    await this.onSiteVisitIdbService.asyncUpdate(this.onSiteVisit);
  }
}
