import { Injectable } from '@angular/core';
import { CompanyIdbService } from './company-idb.service';
import { FacilityIdbService } from './facility-idb.service';
import { firstValueFrom } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { IdbCompany } from '../models/company';
import { IdbAssessment } from '../models/assessment';
import { AssessmentIdbService } from './assessment-idb.service';
import { ContactIdbService } from './contact-idb.service';
import { IdbContact } from '../models/contact';
import { NonEnergyBenefitsIdbService } from './non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit } from '../models/nonEnergyBenefit';
import { OnSiteVisitIdbService } from './on-site-visit-idb.service';
import { IdbOnSiteVisit } from '../models/onSiteVisit';
import { KeyPerformanceIndicatorsIdbService } from './key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { EnergyOpportunityIdbService } from './energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from '../models/energyOpportunity';
import { KeyPerformanceMetricValue } from '../shared/constants/keyPerformanceMetrics';
import { IdbUser } from '../models/user';
import { UserIdbService } from './user-idb.service';

@Injectable({
  providedIn: 'root'
})
export class DbChangesService {

  constructor(private userIdbService: UserIdbService, private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService, private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService) { }


  //TODO: loading service messaging and success toast notification
  async deleteCompany(company: IdbCompany) {
    //delete contacts
    let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    let companyContacts: Array<IdbContact> = contacts.filter(contact => { return contact.companyId == company.guid });
    await this.deleteContacts(companyContacts);
    //delete energy opportunties
    let energyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let companyEnergyOpportunities: Array<IdbEnergyOpportunity> = energyOpportunities.filter(energyOpportunity => { return energyOpportunity.companyId == company.guid });
    await this.deleteEnergyOpportunities(companyEnergyOpportunities);
    //delete NEBs
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    let companyNonEnergyBenefits: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => { return neb.companyId == company.guid; })
    await this.deleteNonEnergyBenefits(companyNonEnergyBenefits);
    //delete assessments
    let assessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let companyAssessments: Array<IdbAssessment> = assessments.filter(assessment => { return assessment.companyId == company.guid });
    await this.deleteAssessments(companyAssessments);
    //delete on site visits
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisitIdbService.onSiteVisits.getValue();
    let companyOnSiteVisits: Array<IdbOnSiteVisit> = onSiteVisits.filter(onSiteVisit => { return onSiteVisit.companyId == company.guid });
    await this.deleteOnSiteVisits(companyOnSiteVisits);
    //delete kpis
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    let companyKeyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = keyPerformanceIndicators.filter(kpi => { return kpi.companyId == company.guid });
    await this.deleteKPIs(companyKeyPerformanceIndicators);
    //delete facilities
    let facilities: Array<IdbFacility> = this.facilityIdbService.facilities.getValue();
    let companyFacilities: Array<IdbFacility> = facilities.filter(facility => { return facility.companyId == company.guid });
    await this.deleteFacilities(companyFacilities);
    //delete company
    await firstValueFrom(this.companyIdbService.deleteWithObservable(company.id))
    await this.companyIdbService.setCompanies();
  }

  async deleteFacility(facility: IdbFacility) {
    //delete contacts?
    //may want to just delete in company..
    // let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    // let facilityContacts: Array<IdbContact> = contacts.filter(contact => { return contact.facilityId == facility.guid });
    // await this.deleteContacts(facilityContacts);
    //delete energy opportunities
    let energyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let facilityEnergyOpportunities: Array<IdbEnergyOpportunity> = energyOpportunities.filter(opportunity => { return opportunity.facilityId == facility.guid });
    await this.deleteEnergyOpportunities(facilityEnergyOpportunities)
    //delete NEBs
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    let facilityNonEnergyBenefits: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => { return neb.facilityId == facility.guid; })
    await this.deleteNonEnergyBenefits(facilityNonEnergyBenefits);
    //delete assessments
    let assessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let facilityAssessments: Array<IdbAssessment> = assessments.filter(assessment => { return assessment.facilityId == facility.guid });
    await this.deleteAssessments(facilityAssessments);
    //delete on site visits
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisitIdbService.onSiteVisits.getValue();
    let facilityOnSiteVisits: Array<IdbOnSiteVisit> = onSiteVisits.filter(onSiteVisit => { return onSiteVisit.companyId == facility.guid });
    await this.deleteOnSiteVisits(facilityOnSiteVisits);
    //delete facility
    await firstValueFrom(this.facilityIdbService.deleteWithObservable(facility.id));
    await this.facilityIdbService.setFacilities();
  }

  async deleteAssessment(assessment: IdbAssessment) {
    //delete energy opportunity
    let energyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = energyOpportunities.filter(opportunity => { return opportunity.assessmentId == assessment.guid });
    await this.deleteEnergyOpportunities(assessmentEnergyOpportunities);
    //delete NEBs
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    let assessmentNonEnergyBenefits: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => { return neb.assessmentId == assessment.guid; })
    await this.deleteNonEnergyBenefits(assessmentNonEnergyBenefits);
    //update contacts
    let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    let assessmentContacts: Array<IdbContact> = contacts.filter(contact => { return contact.assessmentIds.includes(assessment.guid) });
    if (assessmentContacts.length > 0) {
      for (let i = 0; i < assessmentContacts.length; i++) {
        assessmentContacts[i].assessmentIds = assessmentContacts[i].assessmentIds.filter(assessmentId => { return assessmentId != assessment.guid });
        await firstValueFrom(this.contactIdbService.updateWithObservable(assessmentContacts[i]));
      }
      await this.contactIdbService.setContacts();
    }

    //update on site visits
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisitIdbService.onSiteVisits.getValue();
    let assessmentOnSiteVisits: Array<IdbOnSiteVisit> = onSiteVisits.filter(onSiteVisit => { return onSiteVisit.assessmentIds.includes(assessment.guid) });
    if (assessmentOnSiteVisits.length > 0) {
      for (let i = 0; i < assessmentOnSiteVisits.length; i++) {
        assessmentOnSiteVisits[i].assessmentIds = assessmentOnSiteVisits[i].assessmentIds.filter(assessmentId => { return assessmentId != assessment.guid });
        await firstValueFrom(this.onSiteVisitIdbService.updateWithObservable(assessmentOnSiteVisits[i]));
      }
      await this.onSiteVisitIdbService.setOnSiteVisits();
    }

    //delete assessment
    await firstValueFrom(this.assessmentIdbService.deleteWithObservable(assessment.id));
    await this.assessmentIdbService.setAssessments();
  }

  async deleteNonEnergyBenefit(nonEnergyBenefit: IdbNonEnergyBenefit) {
    await firstValueFrom(this.nonEnergyBenefitsIdbService.deleteWithObservable(nonEnergyBenefit.id));
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  async deleteEnergyOpportunity(energyOpportunity: IdbEnergyOpportunity) {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    for (let i = 0; i < nonEnergyBenefits.length; i++) {
      let nonEnergyBenefit: IdbNonEnergyBenefit = nonEnergyBenefits[i];
      if (nonEnergyBenefit.energyOpportunityId == energyOpportunity.guid) {
        await firstValueFrom(this.nonEnergyBenefitsIdbService.deleteWithObservable(nonEnergyBenefit.id));
      }
    }
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
    await firstValueFrom(this.energyOpportunityIdbService.deleteWithObservable(energyOpportunity.id));
    await this.energyOpportunityIdbService.setEnergyOpportunities();
  }

  async deleteAssessments(assessments: Array<IdbAssessment>) {
    for (let i = 0; i < assessments.length; i++) {
      await firstValueFrom(this.assessmentIdbService.deleteWithObservable(assessments[i].id));
    }
    await this.assessmentIdbService.setAssessments();
  }

  async deleteEnergyOpportunities(energyOpportunities: Array<IdbEnergyOpportunity>) {
    for (let i = 0; i < energyOpportunities.length; i++) {
      await firstValueFrom(this.energyOpportunityIdbService.deleteWithObservable(energyOpportunities[i].id));
    }
    await this.energyOpportunityIdbService.setEnergyOpportunities();
  }

  async deleteFacilities(facilities: Array<IdbFacility>) {
    for (let i = 0; i < facilities.length; i++) {
      await firstValueFrom(this.facilityIdbService.deleteWithObservable(facilities[i].id));
    }
    await this.facilityIdbService.setFacilities();
  }

  async deleteContacts(contacts: Array<IdbContact>) {
    for (let i = 0; i < contacts.length; i++) {
      await firstValueFrom(this.contactIdbService.deleteWithObservable(contacts[i].id));
    }
    await this.contactIdbService.setContacts();
  }

  async deleteNonEnergyBenefits(nonEnergyBenefits: Array<IdbNonEnergyBenefit>) {
    for (let i = 0; i < nonEnergyBenefits.length; i++) {
      let nonEnergyBenefit: IdbNonEnergyBenefit = nonEnergyBenefits[i];
      //update contacts
      let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
      let nebContacts: Array<IdbContact> = contacts.filter(contact => { return contact.nonEnergyBenefitIds.includes(nonEnergyBenefit.guid) });
      if (nebContacts.length > 0) {
        for (let i = 0; i < nebContacts.length; i++) {
          nebContacts[i].nonEnergyBenefitIds = nebContacts[i].nonEnergyBenefitIds.filter(nebId => { return nebId != nonEnergyBenefit.guid });
          await firstValueFrom(this.contactIdbService.updateWithObservable(nebContacts[i]));
        }
        await this.contactIdbService.setContacts();
      }
      await firstValueFrom(this.nonEnergyBenefitsIdbService.deleteWithObservable(nonEnergyBenefits[i].id));
    }
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  async deleteOnSiteVisits(onSiteVisits: Array<IdbOnSiteVisit>) {
    for (let i = 0; i < onSiteVisits.length; i++) {
      await firstValueFrom(this.onSiteVisitIdbService.deleteWithObservable(onSiteVisits[i].id));
    }
    await this.onSiteVisitIdbService.setOnSiteVisits();
  }

  async deleteKPIs(keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>) {
    for (let i = 0; i < keyPerformanceIndicators.length; i++) {
      //update contacts
      let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
      let assessmentContacts: Array<IdbContact> = contacts.filter(contact => { return contact.kpiIds.includes(keyPerformanceIndicators[i].guid) });
      if (assessmentContacts.length > 0) {
        for (let a = 0; a < assessmentContacts.length; a++) {
          assessmentContacts[a].kpiIds = assessmentContacts[a].kpiIds.filter(kpiId => { return kpiId != keyPerformanceIndicators[i].guid });
          await firstValueFrom(this.contactIdbService.updateWithObservable(assessmentContacts[a]));
        }
        await this.contactIdbService.setContacts();
      }
      //update NEBs
      let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.getCompanyNonEnergyBenefits(keyPerformanceIndicators[i].companyId);
      if (nonEnergyBenefits.length > 0) {
        for (let b = 0; b < nonEnergyBenefits.length; b++) {
          let nonEnergyBenefit: IdbNonEnergyBenefit = nonEnergyBenefits[b];
          let kpiMetricValues: Array<KeyPerformanceMetricValue> = keyPerformanceIndicators[i].performanceMetrics.flatMap(metric => {
            return metric.value;
          });
          //remove metrics from this kpi
          nonEnergyBenefit.performanceMetricImpacts = nonEnergyBenefit.performanceMetricImpacts.filter(pmi => {
            return !kpiMetricValues.includes(pmi.kpmValue);
          });
          await firstValueFrom(this.nonEnergyBenefitsIdbService.updateWithObservable(nonEnergyBenefit));
        }
        await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
      }
      await firstValueFrom(this.keyPerformanceIndicatorIdbService.deleteWithObservable(keyPerformanceIndicators[i].id));
    }
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
  }

  selectOnSiteVisit(onSiteGUID: string): boolean {
    let onSiteExists: boolean = this.onSiteVisitIdbService.setSelectedFromGUID(onSiteGUID);
    if (onSiteExists) {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.companyIdbService.setSelectedFromGUID(onSiteVisit.companyId);
      this.facilityIdbService.setSelectedFromGUID(onSiteVisit.facilityId);
      return true;
    } else {
      return false;
    }
  }

  async deleteCurrentUser(user: IdbUser) {
    await this.userIdbService.deleteUserWithObservable(user.id);
    let companies: Array<IdbCompany> = await firstValueFrom(this.companyIdbService.getAll());
    companies.forEach((company) => {
      this.deleteCompany(company);
    });
  }

  async updateUser(user: IdbUser) {
    let updatedUser: IdbUser = await firstValueFrom(this.userIdbService.updateWithObservable(user));
    // let users: Array<IdbUser> = await firstValueFrom(this.userIdbService.getAll());
    // this.userIdbService.user.next(users[0]);
    // this.userIdbService.user.next(updatedUser);
  }

  async selectUser(user: IdbUser, skipUpdates: boolean) {
    // update user
    if (!skipUpdates) {
      if (this.userChanged(user)) {
        await this.updateUser(user);
      }
    }
    // update companies
    let userCompanies: Array<IdbCompany> = await firstValueFrom(this.companyIdbService.getAll()); // SINGLE USER
    if (!skipUpdates) {
      for (let i = 0; i < userCompanies.length; i++) {
        let updatedCompany = userCompanies[i];
        if (this.companyChanged(updatedCompany)) {
          await firstValueFrom(this.companyIdbService.updateWithObservable(updatedCompany));
        }
      }
    }
    this.companyIdbService.companies.next(userCompanies);
    // TO DO: link reports/assessments
    
    // flush out the assessments
    
    await this.setFacilities();
    await this.setContacts();
    await this.setEnergyOpportunities();
    await this.setAssessments();
    await this.setKeyPerformanceIndicators();
    await this.setNonEnergyBenefits();
    await this.setOnSiteVisits();

    this.userIdbService.user.next(user);
  }

  async setFacilities() {
    let facilities: Array<IdbFacility> = await firstValueFrom(this.facilityIdbService.getAll());
    this.facilityIdbService.facilities.next(facilities);
  }

  async setContacts() {
    let contacts: Array<IdbContact> = await firstValueFrom(this.contactIdbService.getAll());
    this.contactIdbService.contacts.next(contacts);
  }

  async setEnergyOpportunities() {
    let energyOpportunities: Array<IdbEnergyOpportunity> = await firstValueFrom(this.energyOpportunityIdbService.getAll());
    this.energyOpportunityIdbService.energyOpportunities.next(energyOpportunities);
  }

  async setAssessments() {
    let assessments: Array<IdbAssessment> = await firstValueFrom(this.assessmentIdbService.getAll());
    console.log(assessments);
    this.assessmentIdbService.assessments.next(assessments);
  }

  async setKeyPerformanceIndicators() {
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = await firstValueFrom(this.keyPerformanceIndicatorIdbService.getAll());
    this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.next(keyPerformanceIndicators);
  }

  async setNonEnergyBenefits() {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = await firstValueFrom(this.nonEnergyBenefitsIdbService.getAll());
    this.nonEnergyBenefitsIdbService.nonEnergyBenefits.next(nonEnergyBenefits);
  }

  async setOnSiteVisits() {
    let onsitevisits: Array<IdbOnSiteVisit> = await firstValueFrom(this.onSiteVisitIdbService.getAll());
    this.onSiteVisitIdbService.onSiteVisits.next(onsitevisits);
  }

  // Detect DB Entry changes for updates (update-db-entry.service)

  userChanged(user: IdbUser): boolean {
    let isChanged: boolean = false;
    if (user.skipSplashScreen = true) {
      isChanged = true;
    }
    return isChanged;
  }

  companyChanged(company: IdbCompany): boolean {
    let isChanged: boolean = false;
    // TO DO: Check/reset settings
    if (!company.unitSettings.electricityUnit) {
      company.unitSettings.electricityUnit = 'KWh';
    }
    return isChanged;
  }
}
