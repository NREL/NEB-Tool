import { Injectable } from '@angular/core';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { getGUID } from '../helpFunctions';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

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
      backupFileType: "User",
      timeStamp: new Date(),
      dataBackupId: getGUID()
    }
    return backupFile;
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
  backupFileType: "User" | "Company" | "Facility",
  timeStamp: Date,
  dataBackupId: string
}