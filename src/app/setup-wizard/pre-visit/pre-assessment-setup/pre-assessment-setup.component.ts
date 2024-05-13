import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faPlus, faScrewdriverWrench, faToolbox, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbContact } from 'src/app/models/contact';

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

  assessments: Array<IdbAssessment>;
  contacts: Array<IdbContact>;
  accordionIndex: number = 0;
  processEquipmentOptions: Array<ProcessEquipment>;
  displayDeleteModal: boolean = false;
  assessmentToDelete: IdbAssessment;
  displayContactModal: boolean = false;
  contactAssessmentIndex: number;
  visitDate: Date;
  viewContact: IdbContact;
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
    this.contacts = this.setupWizardService.contacts.getValue();

    if (this.assessments.length > 0) {
      this.visitDate = this.assessments[0].visitDate;
    }
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
    assessment.visitDate = this.visitDate;
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
    this.contacts.forEach(contact => {
      contact.assessmentIds = contact.assessmentIds.filter(aId => {
        return aId != this.assessmentToDelete.guid;
      });
    });
    this.setupWizardService.contacts.next(this.contacts);
    this.closeDeleteModal();
    this.setAccordionIndex(0);
    this.saveChanges();
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
    this.setContacts();
  }

  setVisitDate() {
    this.assessments.forEach(assessment => {
      assessment.visitDate = this.visitDate;
    });
    this.saveChanges();
  }

  setContacts() {
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
