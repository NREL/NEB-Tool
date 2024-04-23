import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faAddressBook, faChevronLeft, faChevronRight, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbContact, getNewIdbContact } from 'src/app/models/contact';
import { IdbCompany } from 'src/app/models/company';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';

@Component({
  selector: 'app-company-contacts-setup',
  templateUrl: './company-contacts-setup.component.html',
  styleUrl: './company-contacts-setup.component.css'
})
export class CompanyContactsSetupComponent {

  accordionIndex: number = 0;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faAddressBook: IconDefinition = faAddressBook;
  faTrash: IconDefinition = faTrash;
  faPlus: IconDefinition = faPlus;
  faUser: IconDefinition = faUser;

  contacts: Array<IdbContact>;
  displayDeleteModal: boolean = false;
  contactToDelete: IdbContact;
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private userIdbService: UserIdbService
  ) {
  }

  ngOnInit() {
    //TODO: Temporary for dev.
    let company: IdbCompany = this.setupWizardService.company.getValue();
    if (!company) {
      this.setupWizardService.initializeDataForDev();
    }
    this.contacts = this.setupWizardService.contacts.getValue();
    if (this.contacts.length == 0) {
      this.addPrimaryContact();
    }
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/company-kpi');
  }

  goToFacilitySetup() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }

  saveChanges() {
    this.setupWizardService.contacts.next(this.contacts);
  }

  addContact() {
    let company: IdbCompany = this.setupWizardService.company.getValue();
    let newContact: IdbContact = getNewIdbContact(company.userId, company.guid);
    this.contacts.push(newContact);
    this.setAccordionIndex(this.contacts.length - 1)
    this.saveChanges();
  }

  setAccordionIndex(index: number) {
    this.accordionIndex = index;
  }

  openDeleteModal(contact: IdbContact) {
    this.contactToDelete = contact;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.contactToDelete = undefined;
  }

  deleteContact() {
    this.contacts = this.contacts.filter(_contact => {
      return _contact.guid != this.contactToDelete.guid;
    });
    this.closeDeleteModal();
    this.setAccordionIndex(0);
    this.saveChanges();
  }


  addPrimaryContact() {
    let company: IdbCompany = this.setupWizardService.company.getValue();
    let newContact: IdbContact = getNewIdbContact(company.userId, company.guid);
    newContact.isPrimary = true;
    newContact.role = 'Primary Contact';
    this.contacts.push(newContact);
    this.saveChanges();
  }
}
