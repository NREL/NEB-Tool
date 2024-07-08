import { Injectable, Version } from '@angular/core';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { getGUID, getNewId } from '../helpFunctions';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { Observable, firstValueFrom } from 'rxjs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { environment } from 'src/environments/environment';
import * as semver from 'semver';

@Injectable({
  providedIn: 'root'
})
export class BackupDataService {

  constructor(
    private userIdbService: UserIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private contactIdbService: ContactIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private loadingService: LoadingService,
  ) { }

  backupData() {
    let backupFile: BackupFile = this.getBackupFile();
    let backupFileName: string = 'userid_' + backupFile.user.guid + '_backup_';
    this.downloadBackup(backupFile, backupFileName);
  }

  downloadBackup(backupFile: BackupFile, backupFileName: string) {
    let jsonData = JSON.stringify(backupFile);
    let dlLink = window.document.createElement("a");
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
    dlLink.setAttribute("href", dataStr);
    const date = backupFile.timeStamp;
    const filename = backupFileName + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
    dlLink.setAttribute('download', filename + '.json');
    dlLink.click();
  }

  getBackupFile(): BackupFile {
    let backupFile: BackupFile = {
      user: this.userIdbService.user.getValue(),
      companies: this.companyIdbService.companies.getValue(),
      facilities: this.facilityIdbService.facilities.getValue(),
      contacts: this.contactIdbService.contacts.getValue(),
      energyOpportunities: this.energyOpportunityIdbService.energyOpportunities.getValue(),
      assessments: this.assessmentIdbService.assessments.getValue(),
      keyPerformanceIndicators: this.keyPerformanceIndicatorsIdbService.keyPerformanceIndicators.getValue(),
      nonEnergyBenefits: this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue(),
      onSiteVisits: this.onSiteVisitIdbService.onSiteVisits.getValue(),
      origin: "JUSTIFI",
      version: environment.version,
      backupFileType: "User",
      timeStamp: new Date(),
      dataBackupId: getGUID()
    }
    return backupFile;
  }

  async importUserBackupFile(backupFile: BackupFile): Promise<IdbUser> {
    // Overwirte existing user with new GUIDs for all dbEntries
    // Avoid problem with importing the same file twice
    
    // this.analyticsService.sendEvent('import_backup_file');
    this.loadingService.setLoadingMessage('Adding Account...');
    let userGUIDs: { oldId: string, newId: string } = {
      oldId: backupFile.user.guid,
      newId: getGUID()
    }
    delete backupFile.user.id;
    backupFile.user.guid = userGUIDs.newId;
    let newUser: IdbUser = await firstValueFrom(this.userIdbService.addWithObservable(backupFile.user));

    // Adding companies
    this.loadingService.setLoadingMessage('Adding Companies...');
    let companyGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.companies.length; i++) {
      let company: IdbCompany = backupFile.companies[i];
      if (!company) {break;}
      let newGUID: string = getGUID();
      companyGUIDs.push({
        newId: newGUID,
        oldId: company.guid
      });
      company.guid = newGUID;
      delete company.id;
      company.userId = userGUIDs.newId;
      await firstValueFrom(this.companyIdbService.addWithObservable(company));
    }

    // Adding Facility
    this.loadingService.setLoadingMessage('Adding Facilities...');
    let facilityGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.facilities.length; i++) {
      let facility: IdbFacility = backupFile.facilities[i];
      if (!facility) {break;}
      let newGUID: string = getGUID();
      facilityGUIDs.push({
        oldId: facility.guid,
        newId: newGUID
      });
      facility.guid = newGUID;
      delete facility.id;
      facility.userId = userGUIDs.newId;
      facility.companyId = getNewId(facility.companyId, companyGUIDs); // avoid same random GUIDs?
      await firstValueFrom(this.facilityIdbService.addWithObservable(facility));
    }

    // Adding contacts
    this.loadingService.setLoadingMessage('Adding contacts...');
    let contactGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.contacts.length; i++) {
      let contact: IdbContact = backupFile.contacts[i];
      if (!contact) {break;}
      let newGUID: string = getGUID();
      contactGUIDs.push({
        newId: newGUID,
        oldId: contact.guid
      });
      delete contact.id;
      contact.userId = userGUIDs.newId;
      contact.companyId = getNewId(contact.companyId, companyGUIDs);
      contact.facilityIds.forEach((facilityId, idx) => {
        contact.facilityIds[idx] = getNewId(facilityId, facilityGUIDs);
      });
      await firstValueFrom(this.contactIdbService.addWithObservable(contact));
    }

    // // Adding equipments
    // this.loadingService.setLoadingMessage('Adding equipments...');
    // let equipmentGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    // for (let i = 0; i < backupFile.equipments.length; i++) {
    //   let equipment: IdbEquipment = backupFile.equipments[i];
    //   let newGUID: string = getGUID();
    //   contactGUIDs.push({
    //     newId: newGUID,
    //     oldId: equipment.guid
    //   });
    //   delete equipment.id;
    //   equipment.userId = userGUIDs.newId;
    //   equipment.companyId = getNewId(equipment.companyId, companyGUIDs);
    //   equipment.facilityId = getNewId(equipment.facilityId, facilityGUIDs);
    //   await firstValueFrom(this.contactIdbService.addWithObservable(contact));
    // }

    // adding assessments
    this.loadingService.setLoadingMessage('Adding Assessments...');
    let assessmentGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.assessments.length; i++) {
      let assessment: IdbAssessment = backupFile.assessments[i];
      if (!assessment) {
        console.log(assessment);
        break;}
      let newGUID: string = getGUID();
      assessmentGUIDs.push({
        newId: newGUID,
        oldId: assessment.guid
      });
      delete assessment.id;
      assessment.userId = userGUIDs.newId;
      assessment.companyId = getNewId(assessment.companyId, companyGUIDs);
      // assessment.equipmentId = getNewId(assessment.equipmentId, equipmentGUIDs);
      await firstValueFrom(this.assessmentIdbService.addWithObservable(assessment));
    }

    // adding energy opportunities
    // energyOpportunities: Array<IdbEnergyOpportunity>,
    this.loadingService.setLoadingMessage('Adding Energy Opportunities...');
    let energyOpportunityGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.energyOpportunities.length; i++) {
      let energyOpportunity: IdbEnergyOpportunity = backupFile.energyOpportunities[i];
      if (!energyOpportunity) {break;}
      let newGUID: string = getGUID();
      energyOpportunityGUIDs.push({
        newId: newGUID,
        oldId: energyOpportunity.guid
      });
      delete energyOpportunity.id;
      energyOpportunity.userId = userGUIDs.newId;
      energyOpportunity.companyId = getNewId(energyOpportunity.companyId, companyGUIDs);
      energyOpportunity.assessmentId = getNewId(energyOpportunity.assessmentId, assessmentGUIDs);
      await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(energyOpportunity));
    }

    // Adding KPIs
    this.loadingService.setLoadingMessage('Adding KPIs...');
    let keyPerformanceIndicatorGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.keyPerformanceIndicators.length; i++) {
      let keyPerformanceIndicator: IdbKeyPerformanceIndicator = backupFile.keyPerformanceIndicators[i];
      if (!keyPerformanceIndicator) {break;}
      let newGUID: string = getGUID();
      keyPerformanceIndicatorGUIDs.push({
        newId: newGUID,
        oldId: keyPerformanceIndicator.guid
      });
      delete keyPerformanceIndicator.id;
      keyPerformanceIndicator.userId = userGUIDs.newId;
      keyPerformanceIndicator.companyId = getNewId(keyPerformanceIndicator.companyId, companyGUIDs);
      await firstValueFrom(this.keyPerformanceIndicatorsIdbService.addWithObservable(keyPerformanceIndicator));
    }

    // Adding NEBs
    // nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    this.loadingService.setLoadingMessage('Adding NEBs...');
    let nonEnergyBenefitGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.keyPerformanceIndicators.length; i++) {
      let nonEnergyBenefit: IdbNonEnergyBenefit = backupFile.nonEnergyBenefits[i];
      if (!nonEnergyBenefit) {break;}
      let newGUID: string = getGUID();
      nonEnergyBenefitGUIDs.push({
        newId: newGUID,
        oldId: nonEnergyBenefit.guid
      });
      delete nonEnergyBenefit.id;
      nonEnergyBenefit.userId = userGUIDs.newId;
      nonEnergyBenefit.companyId = getNewId(nonEnergyBenefit.companyId, companyGUIDs);
      nonEnergyBenefit.facilityId = getNewId(nonEnergyBenefit.facilityId, facilityGUIDs);
      nonEnergyBenefit.assessmentId = getNewId(nonEnergyBenefit.assessmentId, assessmentGUIDs);
      nonEnergyBenefit.energyOpportunityId = getNewId(nonEnergyBenefit.energyOpportunityId, energyOpportunityGUIDs);
      await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(nonEnergyBenefit));
    }

    // Adding onsitevisit
    // onSiteVisits: Array<IdbOnSiteVisit>,
    this.loadingService.setLoadingMessage('Adding Onsite Visits...');
    let onSiteVisitGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.onSiteVisits.length; i++) {
      let onsitevisit: IdbOnSiteVisit = backupFile.onSiteVisits[i];
      if (!onsitevisit) {break;}
      let newGUID: string = getGUID();
      onSiteVisitGUIDs.push({
        newId: newGUID,
        oldId: onsitevisit.guid
      });
      delete onsitevisit.id;
      onsitevisit.userId = userGUIDs.newId;
      onsitevisit.companyId = getNewId(onsitevisit.companyId, companyGUIDs);
      onsitevisit.facilityId = getNewId(onsitevisit.facilityId, facilityGUIDs);
      onsitevisit.assessmentIds.forEach((assessmentId, idx) => {
        onsitevisit.assessmentIds[idx] = getNewId(assessmentId, assessmentGUIDs);
      });
      await firstValueFrom(this.onSiteVisitIdbService.addWithObservable(onsitevisit));
    }

    return newUser;
  }

  backupFileVersionCheck(fileVersion: string, appVersion: string): boolean {
    const parsedFileVersion = semver.parse(fileVersion);
    const parsedAppVersion = semver.parse(appVersion);
    // console.log(parsedFileVersion, parsedAppVersion, parsedFileVersion.prerelease.join('.') === parsedAppVersion.prerelease.join('.'));

    if (!parsedFileVersion || !parsedAppVersion) {
        return false;
    }

    // avoid build metadata, for example, 0.0.1-alpha-06c66911e vs. 0.0.1-alpha
    // use the shorter length to match
    const lengthNoBuildMeta = Math.min(parsedFileVersion.prerelease.length, parsedAppVersion.prerelease.length);

    // Compare major, minor, patch, and pre-release parts
    return (
      parsedFileVersion.major === parsedAppVersion.major &&
      parsedFileVersion.minor === parsedAppVersion.minor &&
      parsedFileVersion.patch === parsedAppVersion.patch &&
      parsedFileVersion.prerelease.join('.').slice(0, lengthNoBuildMeta) === parsedAppVersion.prerelease.join('.').slice(0, lengthNoBuildMeta)
    );
  }
}

export interface BackupFile {
  user: IdbUser,
  companies: Array<IdbCompany>,
  facilities: Array<IdbFacility>,
  contacts: Array<IdbContact>,
  energyOpportunities: Array<IdbEnergyOpportunity>,
  assessments: Array<IdbAssessment>,
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>,
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
  onSiteVisits: Array<IdbOnSiteVisit>,
  origin: "JUSTIFI",
  version: string,
  backupFileType: "User" | "Company" | "Facility",
  timeStamp: Date,
  dataBackupId: string
}