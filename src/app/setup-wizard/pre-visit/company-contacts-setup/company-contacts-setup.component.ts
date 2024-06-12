import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faAddressBook, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IdbContact, getNewIdbContact } from 'src/app/models/contact';
import { IdbCompany } from 'src/app/models/company';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import * as _ from 'lodash';
import { CompanyContactsFormService } from './company-contacts-form/company-contacts-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-contacts-setup',
  templateUrl: './company-contacts-setup.component.html',
  styleUrl: './company-contacts-setup.component.css'
})
export class CompanyContactsSetupComponent {

  allContacts: Array<IdbContact>;
  companyContactGuids: Array<string>;
  contactsSub: Subscription

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;

  accordionIndex: number = 0;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faAddressBook: IconDefinition = faAddressBook;
  faPlus: IconDefinition = faPlus;

  hasInvalidContacts: boolean;
  constructor(private router: Router,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private companyContactsFormService: CompanyContactsFormService
  ) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      this.setCompanyContacts();
      this.setHasInvalidContacts();
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.allContacts = _contacts;
      this.setCompanyContacts();
      this.setHasInvalidContacts();
    });
  }

  setCompanyContacts() {
    if (this.selectedCompany && this.allContacts) {
      let tmpCompanyContacts: Array<IdbContact> = this.allContacts.filter(contact => {
        return contact.companyId == this.selectedCompany.guid;
      });
      let tmpContactIds: Array<string> = tmpCompanyContacts.map(contact => {
        return contact.guid;
      });

      if (!this.companyContactGuids) {
        this.companyContactGuids = tmpContactIds;
      } else {
        //check contact added/removed
        if (this.companyContactGuids.length != tmpContactIds.length) {
          this.companyContactGuids = tmpContactIds;
        }
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

  async addContact() {
    let newContact: IdbContact = getNewIdbContact(this.selectedCompany.userId, this.selectedCompany.guid);
    await firstValueFrom(this.contactIdbService.addWithObservable(newContact))
    await this.contactIdbService.setContacts();
    this.setAccordionIndex(this.companyContactGuids.length - 1);
  }

  setAccordionIndex(index: number) {
    this.accordionIndex = index;
  }

  setHasInvalidContacts() {
    if (this.selectedCompany && this.allContacts) {
      let companyContacts: Array<IdbContact> = this.allContacts.filter(contact => {
        return contact.companyId == this.selectedCompany.guid;
      });
      let hasInvalidContacts: boolean = false;
      companyContacts.forEach(contact => {
        let contactForm: FormGroup = this.companyContactsFormService.getFormFromIdbContact(contact);
        console.log(contactForm.invalid);
        if (contactForm.invalid) {
          hasInvalidContacts = true;
          // Debugging invalid formcontrol
          const invalidControls = [];
          const controls = contactForm.controls;
          for (const name in controls) {
            if (controls[name].invalid) {
              invalidControls.push({ name, errors: controls[name].errors });
            }
          }
          console.log(invalidControls);
        }
      });
      this.hasInvalidContacts = hasInvalidContacts;
    }
  }
}
