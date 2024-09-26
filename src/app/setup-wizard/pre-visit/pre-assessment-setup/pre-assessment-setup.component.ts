import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faContactBook, faPlus, faScrewdriverWrench, faToolbox, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
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
import { AssessmentOptions, AssessmentType, AssessmentTypes } from 'src/app/shared/constants/assessmentTypes';
import { UtilityOption, UtilityOptions } from 'src/app/shared/constants/utilityTypes';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { SharedSettingsFormsService } from 'src/app/shared/shared-settings-forms/shared-settings-forms.service';
import { FormGroup } from '@angular/forms';

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

  energyEquipmentSub: Subscription;
  energyEquipmentOptions: Array<IdbEnergyEquipment>;

  convertValue: ConvertValue = new ConvertValue();

  assessmentTypes: Array<AssessmentType> = AssessmentTypes;
  utilityOptions: Array<UtilityOption> = UtilityOptions;
  
  displayDeleteModal: boolean = false;
  assessmentToDelete: IdbAssessment;
  displayContactModal: boolean = false;
  contactAssessmentIndex: number;
  viewContact: IdbContact;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;
  isFormChange: boolean = false;

  companyEnergyUnit: string;

  accordionGuid: string;
  isAddNew: boolean = false;
  constructor(private router: Router, private assessmentIdbService: AssessmentIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private contactIdbService: ContactIdbService,
    private dbChangesService: DbChangesService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private bootstrapService: BootstrapService,
    private localStorageDataService: LocalStorageDataService,
    private cd: ChangeDetectorRef,
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
    });

    this.companyEnergyUnit = this.companyIdbService.getByGUID(this.onSiteVisit.companyId).companyEnergyUnit;

  }

  ngOnDestroy() {
    this.onSiteVisitSub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.energyEquipmentSub.unsubscribe();
  }
  
  ngAfterViewInit() {
    //open the accordion for last viewed neb
    let lastAssessmentGuid: string = this.localStorageDataService.assessmentAccordionGuid;
    if (lastAssessmentGuid) {
      this.toggleBS(lastAssessmentGuid);
      this.cd.detectChanges();
    }
  }

  async assessmentTypeChange(assessment: IdbAssessment) {
    let utilityTypes = AssessmentOptions.find(
      _assessmentOption => _assessmentOption.assessmentType == assessment.assessmentType)?.utilityTypes || [];
    assessment.utilityTypes = utilityTypes; // track all utility types
    await this.calculateEnergyUse(assessment);
  }

  async calculateEnergyUse(assessment: IdbAssessment) {
    let result = 0;
    assessment.utilityTypes.forEach(utilityType => {
      let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
        _energyUse => _energyUse.utilityType == utilityType);
      if (utilityEnergyUse.include) {
        let convertedValue = this.convertValue.convertValue(
          utilityEnergyUse.energyUse,
          utilityEnergyUse.unit,
          this.companyEnergyUnit).convertedValue;
        result += convertedValue;
      }
    });
    assessment.energyUse = result;
    await this.saveChanges(assessment);
  }

  async saveChanges(assessment: IdbAssessment) {
    this.isFormChange = true;
    this.assessmentIdbService.asyncUpdate(assessment);
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/end-uses');
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
    this.toggleBS(assessment.guid);
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

  toggleBS(assessmentGuid: string) {
    this.bootstrapService.bsCollapse('#' + assessmentGuid);
    if (this.accordionGuid != assessmentGuid) {
      this.accordionGuid = assessmentGuid;
    } else {
      this.accordionGuid = undefined;
    }
    this.localStorageDataService.setAssessmentAccordionGuid(this.accordionGuid);
  }
}
