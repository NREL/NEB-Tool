import { Injectable } from '@angular/core';
import { IdbCompany } from '../models/company';
import { BehaviorSubject } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { IdbProject } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  company: BehaviorSubject<IdbCompany>;
  facility: BehaviorSubject<IdbFacility>;
  project: BehaviorSubject<IdbProject>;
  constructor() { 
    this.company = new BehaviorSubject<IdbCompany>(undefined);
    this.facility = new BehaviorSubject<IdbFacility>(undefined);
    this.project = new BehaviorSubject<IdbProject>(undefined);
  }
}
