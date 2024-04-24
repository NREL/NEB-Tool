import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faC, faChevronLeft, faChevronRight, faFileLines, faListCheck, faPlus, faScrewdriverWrench, faToolbox, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { IdbFacility } from 'src/app/models/facility';

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
  
  equipmentTypeOptions: Array<EquipmentType> = EquipmentTypeOptions;
  assessments: Array<IdbAssessment>;

  accordionIndex: number = 0;
  processEquipmentOptions: Array<ProcessEquipment>;
  displayDeleteModal: boolean = false;
  assessmentToDelete: IdbAssessment;
  constructor(private router: Router, private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    //TODO: Temporary for dev.
    let company: IdbCompany = this.setupWizardService.company.getValue();
    if (!company) {
      this.setupWizardService.initializeDataForDev();
    }
    this.assessments = this.setupWizardService.assessments.getValue();
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    this.processEquipmentOptions = facility.processEquipment;
  }

  goToProjects() {
    this.router.navigateByUrl('/setup-wizard/project-setup');
  }

  saveChanges() {
    this.setupWizardService.assessments.next(this.assessments);
  }

  setAccordionIndex(index: number) {
    this.accordionIndex = index;
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/process-equipment');
  }

  goToNext() {
    this.router.navigateByUrl('/setup-wizard/review-pre-visit');
  }

  addAssessment() {
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    let assessment: IdbAssessment = getNewIdbAssessment(facility.userId, facility.companyId, facility.guid);
    this.assessments.push(assessment);
    this.setAccordionIndex(this.assessments.length - 1);
    this.saveChanges();
  }

  openDeleteModal(assessment: IdbAssessment) {
    this.assessmentToDelete = assessment;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.assessmentToDelete = undefined;
  }

  removeAssessment() {
    this.assessments = this.assessments.filter(_assessment => {
      return _assessment.guid != this.assessmentToDelete.guid;
    });
    this.closeDeleteModal();
    this.setAccordionIndex(0);
    this.saveChanges();
  }

}
