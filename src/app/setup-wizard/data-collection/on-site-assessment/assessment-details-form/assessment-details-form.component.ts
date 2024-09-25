import { Component } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IconDefinition, faContactBook, faPeopleGroup, faUser } from '@fortawesome/free-solid-svg-icons';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { AssessmentOptions, AssessmentType, AssessmentTypes } from 'src/app/shared/constants/assessmentTypes';
import { UnitOption } from 'src/app/shared/constants/unitOptions';
import { UtilityOptions, UtilityType } from 'src/app/shared/constants/utilityTypes';

@Component({
  selector: 'app-assessment-details-form',
  templateUrl: './assessment-details-form.component.html',
  styleUrl: './assessment-details-form.component.css'
})
export class AssessmentDetailsFormComponent {

  faPeopleGroup: IconDefinition = faPeopleGroup;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  assessment: IdbAssessment;
  assessmentSub: Subscription;
  isFormChange: boolean = false;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  energyEquipmentOptions: Array<IdbEnergyEquipment>;
  energyEquipmentSub: Subscription;

  assessmentTypes: Array<AssessmentType> = AssessmentTypes;

  constructor(
    private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private setupWizardService: SetupWizardService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      if (!this.isFormChange) {
        this.assessment = _assessment;
      } else {
        this.isFormChange = false;
      }
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.energyEquipmentSub = this.energyEquipmentIdbService.energyEquipments.subscribe(_energyEquipment => {
      this.energyEquipmentOptions = _energyEquipment;
    })
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
    this.energyEquipmentSub.unsubscribe();
  }

  async assessmentTypeChange() {
    // let utilityTypes = AssessmentOptions.find(
    //   _assessmentOption => _assessmentOption.assessmentType == this.assessment.assessmentType)?.utilityTypes || [];
    // this.assessment.utilityTypes = utilityTypes; // track all utility types
    // // utility type is not the default if the assessment type changes
    // if (this.assessment.utilityType !== utilityTypes[0]) {
    //   this.assessment.utilityType = utilityTypes?.[0]; // update to the first/default utility type
    //   await this.utilityTypeChange();
    // } else {
    //   await this.saveChanges();
    // }
  }

  async utilityTypeChange() {
    // let _energyDefaultUnit = UtilityOptions.find(
    //   _utilityOption => _utilityOption.utilityType == this.assessment.utilityType)?.energyDefaultUnit;
    // if (this.assessment.unitOptionValue !== _energyDefaultUnit.value) {
    //   this.assessment.unitOptionValue = _energyDefaultUnit.value;
    // }
    // console.log(this.assessment.unitOptionValue);
    // await this.saveChanges();
  }

  async saveChanges() {
    this.isFormChange = true;
    await this.assessmentIdbService.asyncUpdate(this.assessment);
  }

  openContactModal(viewContact: IdbContact) {
    this.setupWizardService.displayContactModal.next(
      { context: 'assessment', viewContact: viewContact, contextGuid: this.assessment.guid });

  }
}
