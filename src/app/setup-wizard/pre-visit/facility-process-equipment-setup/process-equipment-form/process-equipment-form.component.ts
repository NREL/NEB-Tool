import { Component, Input } from '@angular/core';
import { faContactBook, faTrash, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { EquipmentType, EquipmentTypes } from 'src/app/shared/constants/equipmentTypes';
import { UtilityType, UtilityTypes } from 'src/app/shared/constants/utilityTypes';

@Component({
  selector: 'app-process-equipment-form',
  templateUrl: './process-equipment-form.component.html',
  styleUrl: './process-equipment-form.component.css'
})
export class ProcessEquipmentFormComponent {
  @Input({required: true})
  processEquipmentGuid: string;

  faTrash: IconDefinition = faTrash;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  processEquipment: IdbProcessEquipment;
  displayDeleteModal: boolean = false;
  contacts: Array<IdbContact>;
  contactSub: Subscription;
  viewContact: IdbContact;
  displayContactModal: boolean = false;
  constructor(private processEquipmentIdbService: ProcessEquipmentIdbService,
    private dbChangesService: DbChangesService,
    private contactIdbService: ContactIdbService
  ) { }

  ngOnInit() {
    this.processEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
    this.contactSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
  }

  ngOnDestroy() {
    this.contactSub.unsubscribe();
  }

  async saveChanges() {
    await this.processEquipmentIdbService.asyncUpdate(this.processEquipment);
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteEquipment() {
    await this.dbChangesService.deleteProcessEquipment(this.processEquipment);
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
