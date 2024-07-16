import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faAddressBook, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IdbContact, getNewIdbContact } from 'src/app/models/contact';
import { IdbCompany } from 'src/app/models/company';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { Observable, Subscription, firstValueFrom, of } from 'rxjs';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import * as _ from 'lodash';
import { CompanyContactsFormService } from './company-contacts-form/company-contacts-form.service';
import { FormGroup } from '@angular/forms';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { CompanyContactsFormComponent } from './company-contacts-form/company-contacts-form.component';

@Component({
  selector: 'app-company-contacts-setup',
  templateUrl: './company-contacts-setup.component.html',
  styleUrl: './company-contacts-setup.component.css'
})
export class CompanyContactsSetupComponent implements OnInit, OnDestroy{

  allContacts: Array<IdbContact>;
  companyContactGuids: Array<string>;
  contactsSub: Subscription
  companyContacts: Array<IdbContact>;
  @ViewChildren(CompanyContactsFormComponent)contactForms: QueryList<CompanyContactsFormComponent>;
  routeGuardWarningModal: boolean = false;

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

  canDeactivate(): Observable<boolean> {
    if (this.hasInvalidContacts) {
      this.contactForms.forEach(form => form.setRequiredInvalidControlsTouched());
      this.dislayWarningModal();
      return of(false);
    }
    return of(true);
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

  ngOnDestroy() {
    if (this.selectedCompanySub) {
      this.selectedCompanySub.unsubscribe();
    }
    if (this.contactsSub) {
      this.contactsSub.unsubscribe();
    }
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-setup');
  }

  goToKPIs() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-select');
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
      this.companyContacts = this.allContacts.filter(contact => {
        return contact.companyId == this.selectedCompany.guid;
      });
      let hasInvalidContacts: boolean = false;
      let contactForms: Array<FormGroup> = [];
      this.companyContacts.forEach(contact => {
        let contactForm: FormGroup = this.companyContactsFormService.getFormFromIdbContact(contact);
        contactForms.push(contactForm);
        if (contactForm.invalid) {
          for (const name of Object.keys(contactForm.controls)) {
            const control = contactForm.get(name);
            if (control && control.errors?.['required']) {
              hasInvalidContacts = true;
              break;
            }
          }
        }
      });
      this.hasInvalidContacts = hasInvalidContacts;
    }
  }
  dislayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
