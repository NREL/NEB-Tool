import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faAddressBook, faChevronLeft, faChevronRight, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbContact, getNewIdbContact } from 'src/app/models/contact';
import { IdbCompany } from 'src/app/models/company';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';

@Component({
  selector: 'app-company-contacts-setup',
  templateUrl: './company-contacts-setup.component.html',
  styleUrl: './company-contacts-setup.component.css'
})
export class CompanyContactsSetupComponent {

  allContacts: Array<IdbContact>;
  companyContacts: Array<IdbContact>;
  contactsSub: Subscription

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;

  accordionIndex: number = 0;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faAddressBook: IconDefinition = faAddressBook;
  faTrash: IconDefinition = faTrash;
  faPlus: IconDefinition = faPlus;
  faUser: IconDefinition = faUser;

  displayDeleteModal: boolean = false;
  contactToDelete: IdbContact;
  isFormChange: boolean = false;
  constructor(private router: Router,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      this.setCompanyContacts();
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.allContacts = _contacts;
      this.setCompanyContacts();
    });
  }

  setCompanyContacts() {
    if (this.selectedCompany && this.allContacts) {
      if (!this.isFormChange) {
        this.companyContacts = this.allContacts.filter(contact => {
          return contact.companyId == this.selectedCompany.guid;
        });
      } else {
        this.isFormChange = false;
      }
    }
  }


  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-setup');
  }

  goToKPIs() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi');
  }

  async saveChanges(contact: IdbContact) {
    this.isFormChange = true;
    await this.contactIdbService.asyncUpdate(contact);
  }

  async addContact() {
    let newContact: IdbContact = getNewIdbContact(this.selectedCompany.userId, this.selectedCompany.guid);
    this.companyContacts.push(newContact)
    this.setAccordionIndex(this.companyContacts.length - 1);
    await firstValueFrom(this.contactIdbService.addWithObservable(newContact))
    await this.contactIdbService.setContacts();
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

  async deleteContact() {
    await firstValueFrom(this.contactIdbService.deleteWithObservable(this.contactToDelete.id));
    await this.contactIdbService.setContacts();
    this.closeDeleteModal();
    this.setAccordionIndex(0);
  }
}
