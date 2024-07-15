import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faDiagramProject, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IdbFacility } from 'src/app/models/facility';
import { ProcessEquipment, getNewProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { UtilityType, UtilityTypeOptions } from 'src/app/shared/constants/utilityTypes';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';

@Component({
  selector: 'app-facility-process-equipment-setup',
  templateUrl: './facility-process-equipment-setup.component.html',
  styleUrl: './facility-process-equipment-setup.component.css'
})
export class FacilityProcessEquipmentSetupComponent {

  accordionIndex: number = 0;
  equipmentTypeOptions: Array<EquipmentType> = EquipmentTypeOptions;
  utilityTypeOptions: Array<UtilityType> = UtilityTypeOptions;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faDiagramProject: IconDefinition = faDiagramProject;
  faTrash: IconDefinition = faTrash;
  faPlus: IconDefinition = faPlus;
  facility: IdbFacility;

  equipmentToDelete: ProcessEquipment;
  displayDeleteModal: boolean = false;

  constructor(private facilityIdbService: FacilityIdbService, private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {

  }

  ngOnInit() {
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    if (!this.facility) {
      this.router.navigateByUrl('/welcome')
    }
  }

  async saveChanges() {
    await this.facilityIdbService.asyncUpdate(this.facility);
  }

  addEquipment() {
    let newEquipment: ProcessEquipment = getNewProcessEquipment();
    this.facility.processEquipment.push(newEquipment);
    this.setAccordionIndex(this.facility.processEquipment.length - 1);
    this.saveChanges();
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
  }

  goToNext() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/pre-assessment');
  }

  async removeEquipment() {
    this.facility.processEquipment = this.facility.processEquipment.filter(_equipment => {
      return _equipment.guid != this.equipmentToDelete.guid;
    });
    //update contacts
    //Unneeded once equipment is updated to being db entry
    // let facilityContacts: Array<IdbContact> = this.contacts.filter(contact => {
    //   return contact.facilityIds.includes(this.facility.guid);
    // });
    // let contactsNeedUpdate: boolean = false;
    // for (let i = 0; i < facilityContacts.length; i++) {
    //   if (facilityContacts[i].processEquipmentIds.includes(this.equipmentToDelete.guid)) {
    //     facilityContacts[i].processEquipmentIds = facilityContacts[i].processEquipmentIds.filter(guid => {
    //       return guid != this.equipmentToDelete.guid;
    //     });
    //     await firstValueFrom(this.contactIdbService.updateWithObservable(facilityContacts[i]));
    //     contactsNeedUpdate = true;
    //   };
    // }
    // if (contactsNeedUpdate) {
    //   await this.contactIdbService.setContacts()
    // }
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
}
