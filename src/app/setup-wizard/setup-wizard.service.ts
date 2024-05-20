import { Injectable } from '@angular/core';
import { IdbCompany, getNewIdbCompany } from '../models/company';
import { BehaviorSubject } from 'rxjs';
import { IdbFacility, getNewIdbFacility } from '../models/facility';
import { IdbProject } from '../models/project';
import { IdbAssessment, getNewIdbAssessment } from '../models/assessment';
import { IdbContact, getNewIdbContact } from '../models/contact';
import { IdbUser } from '../models/user';
import { UserIdbService } from '../indexed-db/user-idb.service';
import { KPI_Option, KPI_Options, KeyPerformanceIndicator, getKeyPerformanceIndicator } from '../shared/constants/keyPerformanceIndicators';
import { ProcessEquipment, getNewProcessEquipment } from '../shared/constants/processEquipment';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from '../models/nonEnergyBenefit';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  company: BehaviorSubject<IdbCompany>;
  facility: BehaviorSubject<IdbFacility>;
  projects: BehaviorSubject<Array<IdbProject>>;
  assessments: BehaviorSubject<Array<IdbAssessment>>;
  contacts: BehaviorSubject<Array<IdbContact>>;
  nonEnergyBenefits: BehaviorSubject<Array<IdbNonEnergyBenefit>>;

  setupContext: BehaviorSubject<SetupWizardContext>;

  highlighProjectGuid: BehaviorSubject<string>;
  highlighNebGuid: BehaviorSubject<string>;
  sidebarOpen: BehaviorSubject<boolean>;
  constructor(private userIdbService: UserIdbService,
    private localStorageService: LocalStorageService
  ) {
    this.company = new BehaviorSubject<IdbCompany>(undefined);
    this.facility = new BehaviorSubject<IdbFacility>(undefined);
    this.projects = new BehaviorSubject<Array<IdbProject>>([]);
    this.assessments = new BehaviorSubject<Array<IdbAssessment>>([]);
    this.contacts = new BehaviorSubject<Array<IdbContact>>([]);
    this.nonEnergyBenefits = new BehaviorSubject<Array<IdbNonEnergyBenefit>>([]);
    this.highlighNebGuid = new BehaviorSubject<string>(undefined);
    this.highlighProjectGuid = new BehaviorSubject<string>(undefined);

    let setupContext: SetupWizardContext = this.localStorageService.retrieve("setupContext");
    if (setupContext) {
      this.setupContext = new BehaviorSubject<SetupWizardContext>(setupContext);
    } else {
      this.setupContext = new BehaviorSubject<SetupWizardContext>('full');
    }

    //subscribe after initialization
    this.setupContext.subscribe(setupContext => {
      if (setupContext) {
        this.localStorageService.store('setupContext', setupContext);
      }
    });

    this.sidebarOpen = new BehaviorSubject<boolean>(true);
  }
}


export type SetupWizardContext = 'preVisit' | 'postVisit' | 'onSite' | 'full';