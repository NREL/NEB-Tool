import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition, faChevronLeft, faCircleCheck, faSave, faUser } from '@fortawesome/free-solid-svg-icons';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { ContactContext, IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent {
  @Input()
  contextGuid: string;
  @Input()
  contactContext: ContactContext;
  @Input()
  selectedContact: IdbContact;
  @Output('emitCancelContact')
  emitCancelContact: EventEmitter<boolean> = new EventEmitter();

  displayModal: boolean = false;
  contacts: Array<IdbContact>;
  faSave: IconDefinition = faSave;
  faCircleCheck: IconDefinition = faCircleCheck;
  faChevronLeft: IconDefinition = faChevronLeft;
  faUser: IconDefinition = faUser;
  constructor(private setupWizardService: SetupWizardService,
    private contactIdbService: ContactIdbService
  ) {
  }

  ngOnInit() {
    //TODO: get contact within dashboards..
    //Use copy to not modify without hitting save
    this.contacts = JSON.parse(JSON.stringify(this.setupWizardService.contacts.getValue()));
    setTimeout(() => {
      this.displayModal = true;
    }, 100)
  }

  closeModal() {
    this.displayModal = false;
    this.emitCancelContact.emit(false);
  }

  saveChanges() {
    this.setupWizardService.contacts.next(this.contacts);
    this.closeModal();
  }

  viewContact(contact: IdbContact) {
    this.selectedContact = contact;
  }

  async toggleContactActive(contactIndex: number) {
    if (this.contactContext == 'assessment') {
      if (this.contacts[contactIndex].assessmentIds.includes(this.contextGuid)) {
        this.contacts[contactIndex].assessmentIds = this.contacts[contactIndex].assessmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.contacts[contactIndex].assessmentIds.push(this.contextGuid);
      }
    } else if (this.contactContext == 'processEquipment') {
      if (this.contacts[contactIndex].processEquipmentIds.includes(this.contextGuid)) {
        this.contacts[contactIndex].processEquipmentIds = this.contacts[contactIndex].processEquipmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.contacts[contactIndex].processEquipmentIds.push(this.contextGuid);
      }
    } else if (this.contactContext == 'KPI') {
      if (this.contacts[contactIndex].kpiIds.includes(this.contextGuid)) {
        this.contacts[contactIndex].kpiIds = this.contacts[contactIndex].kpiIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.contacts[contactIndex].kpiIds.push(this.contextGuid);
      }
    }
  }
}
