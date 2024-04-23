import { Injectable } from '@angular/core';
import { IdbCompany } from '../models/company';
import { BehaviorSubject } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { IdbProject } from '../models/project';
import { IdbAssessment } from '../models/assessment';
import { IdbContact } from '../models/contact';

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

  constructor() { 
    this.company = new BehaviorSubject<IdbCompany>(undefined);
    this.facility = new BehaviorSubject<IdbFacility>(undefined);
    this.projects = new BehaviorSubject<Array<IdbProject>>([]);
    this.assessment = new BehaviorSubject<IdbAssessment>(undefined);
    this.setupContext = new BehaviorSubject<SetupWizardContext>('preVisit');
    this.contacts = new BehaviorSubject<Array<IdbContact>>([]);
  }
}


export type SetupWizardContext = 'preVisit' | 'postVisit' | 'onSite' | 'full';