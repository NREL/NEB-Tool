import { Component, Input } from '@angular/core';
import { faContactBook, faTrash, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { UtilityType, UtilityTypes } from 'src/app/shared/constants/utilityTypes';

@Component({
  selector: 'app-energy-equipment-form',
  templateUrl: './energy-equipment-form.component.html',
  styleUrl: './energy-equipment-form.component.css'
})
export class EnergyEquipmentFormComponent {
  @Input({ required: true })
  energyEquipmentGuid: string;

  faTrash: IconDefinition = faTrash;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  equipmentTypeOptions: Array<EquipmentType> = EquipmentTypeOptions;
  utilityTypes: Array<UtilityType> = UtilityTypes;
  energyEquipment: IdbEnergyEquipment
  displayDeleteModal: boolean = false;
  contacts: Array<IdbContact>;
  contactSub: Subscription;
  viewContact: IdbContact;
  displayContactModal: boolean = false;
  constructor(private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private dbChangesService: DbChangesService,
    private contactIdbService: ContactIdbService
  ) { }

  ngOnInit() {
    this.energyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    this.contactSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
  }

  ngOnDestroy() {
    this.contactSub.unsubscribe();
  }

  async saveChanges() {
    await this.energyEquipmentIdbService.asyncUpdate(this.energyEquipment);
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteEquipment() {
    await this.dbChangesService.deleteEnergyEquipment(this.energyEquipment);
  }

  openContactModal(viewContact: IdbContact) {
    this.viewContact = viewContact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.viewContact = undefined;
  }
}
