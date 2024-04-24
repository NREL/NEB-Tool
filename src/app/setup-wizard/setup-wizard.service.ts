import { Injectable } from '@angular/core';
import { IdbCompany, getNewIdbCompany } from '../models/company';
import { BehaviorSubject } from 'rxjs';
import { IdbFacility, getNewIdbFacility } from '../models/facility';
import { IdbProject } from '../models/project';
import { IdbAssessment, getNewIdbAssessment } from '../models/assessment';
import { IdbContact, getNewIdbContact } from '../models/contact';
import { IdbUser } from '../models/user';
import { UserIdbService } from '../indexed-db/user-idb.service';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  company: BehaviorSubject<IdbCompany>;
  facility: BehaviorSubject<IdbFacility>;
  projects: BehaviorSubject<Array<IdbProject>>;
  assessment: BehaviorSubject<IdbAssessment>;
  contacts: BehaviorSubject<Array<IdbContact>>;

  setupContext: BehaviorSubject<SetupWizardContext>;

  constructor(private userIdbService: UserIdbService) {
    this.company = new BehaviorSubject<IdbCompany>(undefined);
    this.facility = new BehaviorSubject<IdbFacility>(undefined);
    this.projects = new BehaviorSubject<Array<IdbProject>>([]);
    this.assessment = new BehaviorSubject<IdbAssessment>(undefined);
    this.setupContext = new BehaviorSubject<SetupWizardContext>('full');
    this.contacts = new BehaviorSubject<Array<IdbContact>>([]);
  }


  initializeDataForDev() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let company: IdbCompany = this.company.getValue();
    //TODO: Temporary for dev.
    if (!company) {
      company = getNewIdbCompany(user.guid);
      this.company.next(company);
    }
    let facility: IdbFacility = this.facility.getValue();;
    if (!facility) {
      facility = getNewIdbFacility(company.userId, company.guid);
      this.facility.next(facility);
    }

    let contacts: Array<IdbContact> = this.contacts.getValue();
    if (contacts.length == 0) {
      let newContact: IdbContact = getNewIdbContact(company.userId, company.guid);
      newContact.isPrimary = true;
      newContact.role = 'Primary Contact';
      newContact.name = 'Primary Contact';
      contacts.push(newContact);
      this.contacts.next(contacts);
    }

    let assessment: IdbAssessment = this.assessment.getValue();
    if (!assessment) {
      assessment = getNewIdbAssessment(facility.userId, facility.companyId, facility.guid);
      this.assessment.next(assessment);
    }
  }
}


export type SetupWizardContext = 'preVisit' | 'postVisit' | 'onSite' | 'full';