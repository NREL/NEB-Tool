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
  assessments: BehaviorSubject<Array<IdbAssessment>>;
  //TODO: Remove
  assessment: BehaviorSubject<IdbAssessment>;
  //
  contacts: BehaviorSubject<Array<IdbContact>>;

  setupContext: BehaviorSubject<SetupWizardContext>;

  constructor(private userIdbService: UserIdbService) {
    this.company = new BehaviorSubject<IdbCompany>(undefined);
    this.facility = new BehaviorSubject<IdbFacility>(undefined);
    //TODO: Removew
    this.assessment = new BehaviorSubject<IdbAssessment>(undefined);
    //
    this.projects = new BehaviorSubject<Array<IdbProject>>([]);
    this.assessments = new BehaviorSubject<Array<IdbAssessment>>([]);
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
      newContact.name = 'Mark Root';
      newContact.email = 'rootrm@ornl.gov';
      newContact.phone = '9524128045';
      newContact.team = 'Lead';
      contacts.push(newContact);
      let secondContact: IdbContact = getNewIdbContact(company.userId, company.guid);
      secondContact.role = 'Maintenance Lead';
      secondContact.team = 'Maintenance';
      secondContact.name = 'Jerry Hill';
      secondContact.email = 'j.hill@fakeCompany.org';
      secondContact.notes = '2nd shift maintenance lead';
      secondContact.phone = '9522333006';
      contacts.push(secondContact);
      let thirdContact: IdbContact = getNewIdbContact(company.userId, company.guid);
      thirdContact.role = 'Machine Engineer';
      thirdContact.team = 'Operations';
      thirdContact.name = 'Kathy Costa';
      thirdContact.email = 'k.costa@fakeCompany.org';
      thirdContact.notes = '';
      thirdContact.phone = '94124115088';
      contacts.push(thirdContact);
      this.contacts.next(contacts);
    }
  }
}


export type SetupWizardContext = 'preVisit' | 'postVisit' | 'onSite' | 'full';