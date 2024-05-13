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
  highlighNebGuid:  BehaviorSubject<string>;
  sidebarOpen: BehaviorSubject<boolean>;
  constructor(private userIdbService: UserIdbService) {
    this.company = new BehaviorSubject<IdbCompany>(undefined);
    this.facility = new BehaviorSubject<IdbFacility>(undefined);
    this.projects = new BehaviorSubject<Array<IdbProject>>([]);
    this.assessments = new BehaviorSubject<Array<IdbAssessment>>([]);
    this.setupContext = new BehaviorSubject<SetupWizardContext>('full');
    this.contacts = new BehaviorSubject<Array<IdbContact>>([]);
    this.nonEnergyBenefits = new BehaviorSubject<Array<IdbNonEnergyBenefit>>([]);
    this.highlighNebGuid = new  BehaviorSubject<string>(undefined);
    this.highlighProjectGuid = new  BehaviorSubject<string>(undefined);
    this.sidebarOpen = new BehaviorSubject<boolean>(true);
  }


  initializeDataForDev() {
    console.log('init wizard..');
    let user: IdbUser = this.userIdbService.user.getValue();
    let company: IdbCompany = getNewIdbCompany(user.guid);
    company.generalInformation.name = 'Example Company';
    [1, 3, 5].forEach(kpiIndex => {
      let kpiOption: KPI_Option = KPI_Options[kpiIndex];
      let kpi: KeyPerformanceIndicator = getKeyPerformanceIndicator(kpiOption);
      company.keyPerformanceIndicators.push(kpi);
    })
    this.company.next(company);
    let facility: IdbFacility = getNewIdbFacility(company.userId, company.guid);
    facility.generalInformation.name = 'Example Facility';


    let pump: ProcessEquipment = getNewProcessEquipment();
    pump.equipmentName = 'Pump 1';
    pump.equipmentType = 'Pump';
    pump.utilityType = 'Electricity';
    facility.processEquipment.push(pump);

    let fan: ProcessEquipment = getNewProcessEquipment();
    fan.equipmentName = 'Fan 1';
    fan.equipmentType = 'Fan';
    fan.utilityType = 'Electricity';
    facility.processEquipment.push(fan);

    let furnace: ProcessEquipment = getNewProcessEquipment();
    furnace.equipmentName = 'Furnace';
    furnace.equipmentType = 'Process Heating';
    furnace.utilityType = 'Natural Gas';
    facility.processEquipment.push(furnace);
    this.facility.next(facility);

    let assessments: Array<IdbAssessment> = new Array();
    let pumpAssessment: IdbAssessment = getNewIdbAssessment(facility.userId, facility.companyId, facility.guid);
    pumpAssessment.name = 'Pump Assessment';
    pumpAssessment.equipmentId = pump.guid;
    pumpAssessment.visitDate = new Date();
    assessments.push(pumpAssessment);


    let fanAssessment: IdbAssessment = getNewIdbAssessment(facility.userId, facility.companyId, facility.guid);
    fanAssessment.name = 'Fan Assessment';
    fanAssessment.equipmentId = fan.guid;
    fanAssessment.visitDate = new Date();
    assessments.push(fanAssessment);


    let furnaceAssessment: IdbAssessment = getNewIdbAssessment(facility.userId, facility.companyId, facility.guid);
    furnaceAssessment.name = 'Furnace Assessment';
    furnaceAssessment.equipmentId = furnace.guid;
    furnaceAssessment.visitDate = new Date();
    assessments.push(furnaceAssessment);
    this.assessments.next(assessments);

    let contacts: Array<IdbContact> = this.contacts.getValue();
    let newContact: IdbContact = getNewIdbContact(company.userId, company.guid);
    newContact.isPrimary = true;
    newContact.role = 'Primary Contact';
    newContact.name = 'Mark Root';
    newContact.email = 'rootrm@ornl.gov';
    newContact.phone = '9524118655';
    newContact.team = 'Lead';
    newContact.kpiIds = [company.keyPerformanceIndicators[0].kpiOptionValue];
    newContact.processEquipmentIds = [facility.processEquipment[0].guid];
    newContact.assessmentIds = [assessments[0].guid];
    contacts.push(newContact);
    let secondContact: IdbContact = getNewIdbContact(company.userId, company.guid);
    secondContact.role = 'Maintenance Lead';
    secondContact.team = 'Maintenance';
    secondContact.name = 'Jerry Hill';
    secondContact.email = 'j.hill@fakeCompany.org';
    secondContact.notes = '2nd shift maintenance lead';
    secondContact.phone = '9522333006';
    secondContact.kpiIds = [company.keyPerformanceIndicators[1].kpiOptionValue];
    secondContact.processEquipmentIds = [facility.processEquipment[1].guid];
    secondContact.assessmentIds = [assessments[1].guid];
    contacts.push(secondContact);
    let thirdContact: IdbContact = getNewIdbContact(company.userId, company.guid);
    thirdContact.role = 'Machine Engineer';
    thirdContact.team = 'Operations';
    thirdContact.name = 'Kathy Costa';
    thirdContact.email = 'k.costa@fakeCompany.org';
    thirdContact.notes = '';
    thirdContact.phone = '94124115088';
    thirdContact.kpiIds = [company.keyPerformanceIndicators[2].kpiOptionValue];
    thirdContact.processEquipmentIds = [facility.processEquipment[2].guid];
    thirdContact.assessmentIds = [assessments[2].guid];
    contacts.push(thirdContact);
    this.contacts.next(contacts);
  }
}


export type SetupWizardContext = 'preVisit' | 'postVisit' | 'onSite' | 'full';