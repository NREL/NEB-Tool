import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faPlus, faScrewdriverWrench, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { ProcessEquipment, getNewProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { IdbContact } from 'src/app/models/contact';

@Component({
  selector: 'app-facility-process-equipment-setup',
  templateUrl: './facility-process-equipment-setup.component.html',
  styleUrl: './facility-process-equipment-setup.component.css'
})
export class FacilityProcessEquipmentSetupComponent {

  accordionIndex: number = 0;

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faTrash: IconDefinition = faTrash;
  faPlus: IconDefinition = faPlus;
  faUser: IconDefinition = faUser;
  facility: IdbFacility;

  equipmentToDelete: ProcessEquipment;
  displayDeleteModal: boolean = false;
  contacts: Array<IdbContact>;
  displayContactModal: boolean = false;
  contactEquipmentIndex: number;
  editContactId: string;
  constructor(private setupWizardService: SetupWizardService, private router: Router) {

  }

  ngOnInit() {
    let company: IdbCompany = this.setupWizardService.company.getValue();
    if(!company){
      this.setupWizardService.initializeDataForDev();
    }
    this.facility = this.setupWizardService.facility.getValue();
    this.contacts = this.setupWizardService.contacts.getValue();
  }

  saveChanges() {
    this.setupWizardService.facility.next(this.facility);
  }

  addEquipment() {
    let newEquipment: ProcessEquipment = getNewProcessEquipment();
    this.facility.processEquipment.push(newEquipment);
    this.setAccordionIndex(this.facility.processEquipment.length - 1);
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }

  goToNext() {
    this.router.navigateByUrl('/setup-wizard/pre-assessment');
  }

  removeEquipment() {
    this.facility.processEquipment = this.facility.processEquipment.filter(_equipment => {
      return _equipment.guid != this.equipmentToDelete.guid;
    });
    this.closeDeleteModal();
    this.setAccordionIndex(0);
    this.saveChanges();
  }

  setAccordionIndex(index: number) {
    this.accordionIndex = index;
  }

  openDeleteModal(equipment: ProcessEquipment) {
    this.equipmentToDelete = equipment;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.equipmentToDelete = undefined;
  }

  openContactModal(equipmentIndex: number, contactId: string) {
    this.contactEquipmentIndex = equipmentIndex;
    this.editContactId = contactId;
    this.displayContactModal = true;
  }

  closeContactModal(){
    this.displayContactModal = false;
    this.contactEquipmentIndex = undefined;
    this.editContactId = undefined;
  }

  setContact(contactId: string){
    this.facility.processEquipment[this.contactEquipmentIndex].contactId = contactId;
    this.closeContactModal();
  }
}
