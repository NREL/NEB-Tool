import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faCircleCheck, faSave, faUser } from '@fortawesome/free-solid-svg-icons';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent {
  @Input()
  contactId: string;
  @Output('emitSelectedContact')
  emitSelectedContact: EventEmitter<string> = new EventEmitter();
  @Output('emitCancelContact')
  emitCancelContact: EventEmitter<boolean> = new EventEmitter();

  displayModal: boolean = false;
  contacts: Array<IdbContact>;
  faSave: IconDefinition = faSave;
  faCircleCheck: IconDefinition = faCircleCheck;
  faChevronLeft: IconDefinition = faChevronLeft;
  faUser: IconDefinition = faUser;
  selectedContact: IdbContact;
  constructor(private contactIdbService: ContactIdbService, private router: Router, private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    if (this.router.url.includes('setup-wizard')) {
      this.contacts = this.setupWizardService.contacts.getValue();
    }
    this.setSelectedContact();
    //TODO: get contact within dashboards..
    setTimeout(() => {
      this.displayModal = true;
    }, 100)
  }

  closeModal() {
    this.displayModal = false;
    this.emitCancelContact.emit(false);
  }

  saveChanges() {
    this.displayModal = false;
    this.emitSelectedContact.emit(this.contactId);
  }

  selectContact(contactId: string) {
    this.contactId = contactId;
    this.setSelectedContact();
  }

  setSelectedContact() {
    if (this.contactId) {
      this.selectedContact = this.contacts.find(_contact => {
        return _contact.guid == this.contactId
      });
    } else {
      this.selectedContact = undefined;
    }
  }
}
