import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faAddressBook, faChevronLeft, faChevronRight, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbContact, getNewIdbContact } from 'src/app/models/contact';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbUser } from 'src/app/models/user';
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
    let user: IdbUser = this.userIdbService.user.getValue();
    let newIdbCompany: IdbCompany = this.setupWizardService.company.getValue();
    //TODO: Temporary for dev.
    if (!newIdbCompany) {
      newIdbCompany = getNewIdbCompany(user.guid);
      this.setupWizardService.company.next(newIdbCompany);
    }
    this.contacts = this.setupWizardService.contacts.getValue();
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

}
