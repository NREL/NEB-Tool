import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faContactBook, faPlus, faScrewdriverWrench, faToolbox, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbContact } from 'src/app/models/contact';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { Subscription, firstValueFrom } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { assessmentOptions, AssessmentType, assessmentTypes } from 'src/app/shared/constants/assessmentTypes';
import { EnergyUnitOptions, UnitOption } from 'src/app/shared/constants/unitOptions';
import { UtilityOption, utilityOptions, UtilityType } from 'src/app/shared/constants/utilityTypes';

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
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  accordionIndex: number = 0;

  energyEquipmentSub: Subscription;
  energyEquipmentOptions: Array<IdbEnergyEquipment>;

  assessmentTypes: Array<AssessmentType> = assessmentTypes;
  utilityOptions: Array<UtilityOption> = utilityOptions;
  
  displayDeleteModal: boolean = false;
  assessmentToDelete: IdbAssessment;
  displayContactModal: boolean = false;
  contactAssessmentIndex: number;
  viewContact: IdbContact;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;
  isFormChange: boolean = false;

  constructor(private router: Router, private assessmentIdbService: AssessmentIdbService,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private contactIdbService: ContactIdbService,
    private dbChangesService: DbChangesService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_onSiteVisit => {
      this.onSiteVisit = _onSiteVisit;
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      if (!this.isFormChange) {
        this.assessments = _assessments;
      } else {
        this.isFormChange = false;
      }
    });

    this.energyEquipmentSub = this.energyEquipmentIdbService.energyEquipments.subscribe(equipments => {
      this.energyEquipmentOptions = equipments;
    })
  }

  ngOnDestroy() {
    this.onSiteVisitSub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.energyEquipmentSub.unsubscribe();
  }
  

  setUtilityTypes(assessment: IdbAssessment) {
    let utilityTypes = assessmentOptions.find(_assessmentOption => _assessmentOption.assessmentType == assessment.assessmentType)?.utilityTypes || [];
    assessment.utilityTypes = utilityTypes; // track all utility types
    if (!assessment.utilityTypes.includes(assessment.utilityType)) { // update utility type if the assessment type changes
      assessment.utilityType = utilityTypes?.[0]; // update to the first utility type if current type is not in the associated types
      this.setUnitOptionValue(assessment);
    } else {
      this.saveChanges(assessment);
    }
  }

  setUnitOptionValue(assessment: IdbAssessment) {
    let unitOptions = utilityOptions.find(_utilityOption => _utilityOption.utilityType == assessment.utilityType)?.unitOptions || [];
    if (unitOptions.map(unitOption => unitOption.value).indexOf(assessment.unitOptionValue) == -1) {
      assessment.unitOptionValue = unitOptions?.[0].value;
    }
    this.saveChanges(assessment);
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

  openContactModal(assessmentIndex: number, viewContact: IdbContact) {
    this.contactAssessmentIndex = assessmentIndex;
    this.viewContact = viewContact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.contactAssessmentIndex = undefined;
    this.viewContact = undefined;
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
