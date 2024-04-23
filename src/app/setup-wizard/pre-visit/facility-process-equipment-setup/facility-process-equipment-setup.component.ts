import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faPlus, faScrewdriverWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from '../../setup-wizard.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { ProcessEquipment, getNewProcessEquipment } from 'src/app/shared/constants/processEquipment';

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
  facility: IdbFacility;
  
  equipmentToDelete: ProcessEquipment;
  displayDeleteModal: boolean = false;
  constructor(private setupWizardService: SetupWizardService, private router: Router,
    private userIdbService: UserIdbService) {

  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let newIdbCompany: IdbCompany = this.setupWizardService.company.getValue();
    //TODO: Temporary for dev.
    if (!newIdbCompany) {
      newIdbCompany = getNewIdbCompany(user.guid);
      this.setupWizardService.company.next(newIdbCompany);
    }
    this.facility = this.setupWizardService.facility.getValue();;
    if (!this.facility) {
      this.facility = getNewIdbFacility(newIdbCompany.userId, newIdbCompany.guid);
      this.setupWizardService.facility.next(this.facility);
    }
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

  closeDeleteModal(){
      this.displayDeleteModal = false;
      this.equipmentToDelete = undefined;
  }
}
