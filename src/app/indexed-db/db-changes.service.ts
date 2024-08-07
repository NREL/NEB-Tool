import { Injectable } from '@angular/core';
import { CompanyIdbService } from './company-idb.service';
import { FacilityIdbService } from './facility-idb.service';
import { first, firstValueFrom } from 'rxjs';
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
import { EnergyEquipmentIdbService } from './energy-equipment-idb.service';
import { ProcessEquipmentIdbService } from './process-equipment-idb.service';
import { IdbEnergyEquipment } from '../models/energyEquipment';
import { IdbProcessEquipment } from '../models/processEquipment';
import { IdbUser } from '../models/user';
import { UserIdbService } from './user-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from './key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceMetricImpact } from '../models/keyPerformanceMetricImpact';

@Injectable({
  providedIn: 'root'
})
export class DbChangesService {

  constructor(private userIdbService: UserIdbService, private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService, private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService) { }


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
    //delete energy equipment
    let energyEquipments: Array<IdbEnergyEquipment> = this.energyEquipmentIdbService.energyEquipments.getValue();
    let companyEnergyEquipments: Array<IdbEnergyEquipment> = energyEquipments.filter(energyEquipment => { return energyEquipment.companyId == company.guid });
    await this.deleteEnergyEquipments(companyEnergyEquipments);
    //delete process equipment
    let processEquipments: Array<IdbProcessEquipment> = this.processEquipmentIdbService.processEquipments.getValue();
    let companyProcessEquipment: Array<IdbProcessEquipment> = processEquipments.filter(processEquipment => { return processEquipment.companyId == company.guid });
    await this.deleteProcessEquipments(companyProcessEquipment);
    //delete on site visits
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisitIdbService.onSiteVisits.getValue();
    let companyOnSiteVisits: Array<IdbOnSiteVisit> = onSiteVisits.filter(onSiteVisit => { return onSiteVisit.companyId == company.guid });
    await this.deleteOnSiteVisits(companyOnSiteVisits);
    //delete kpis
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    let companyKeyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = keyPerformanceIndicators.filter(kpi => { return kpi.companyId == company.guid });
    await this.deleteKPIs(companyKeyPerformanceIndicators);
    //delete kpm impacts
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    let companyKeyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = keyPerformanceMetricImpacts.filter(kpmImpact => { return kpmImpact.companyId == company.guid });
    await this.deleteKeyPerformanceMetricImpacts(companyKeyPerformanceMetricImpacts)
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
    //delete kpm impacts
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    let assessmentKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = keyPerformanceMetricImpacts.filter(metricImpact => { return metricImpact.facilityId == facility.guid; })
    await this.deleteKeyPerformanceMetricImpacts(assessmentKpmImpacts);
    //delete energy equipment
    let energyEquipments: Array<IdbEnergyEquipment> = this.energyEquipmentIdbService.energyEquipments.getValue();
    let facilityEnergyEquipments: Array<IdbEnergyEquipment> = energyEquipments.filter(energyEquipment => { return energyEquipment.facilityId == facility.guid });
    await this.deleteEnergyEquipments(facilityEnergyEquipments);
    //delete process equipment
    let processEquipments: Array<IdbProcessEquipment> = this.processEquipmentIdbService.processEquipments.getValue();
    let facilityProcessEquipment: Array<IdbProcessEquipment> = processEquipments.filter(processEquipment => { return processEquipment.facilityId == facility.guid });
    await this.deleteProcessEquipments(facilityProcessEquipment);
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
    //delete kpm impacts
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    let assessmentKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = keyPerformanceMetricImpacts.filter(metricImpact => { return metricImpact.assessmentId == assessment.guid; })
    await this.deleteKeyPerformanceMetricImpacts(assessmentKpmImpacts);
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
    //delete kpm impacts
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    let nebKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = keyPerformanceMetricImpacts.filter(metricImpact => { return metricImpact.nebId == nonEnergyBenefit.guid; })
    await this.deleteKeyPerformanceMetricImpacts(nebKpmImpacts);

    await firstValueFrom(this.nonEnergyBenefitsIdbService.deleteWithObservable(nonEnergyBenefit.id));
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  async deleteEnergyOpportunity(energyOpportunity: IdbEnergyOpportunity) {
    //delete NEBs
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    let assessmentNonEnergyBenefits: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => { return neb.energyOpportunityId == energyOpportunity.guid; })
    await this.deleteNonEnergyBenefits(assessmentNonEnergyBenefits);
    //delete kpm impacts
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    let opportunityKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = keyPerformanceMetricImpacts.filter(metricImpact => { return metricImpact.energyOpportunityId == energyOpportunity.guid; })
    await this.deleteKeyPerformanceMetricImpacts(opportunityKpmImpacts);

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

  async deleteEnergyEquipments(energyEquipments: Array<IdbEnergyEquipment>) {
    for (let i = 0; i < energyEquipments.length; i++) {
      await firstValueFrom(this.energyEquipmentIdbService.deleteWithObservable(energyEquipments[i].id))
    }
    await this.energyEquipmentIdbService.setEnergyEquipments();
  }

  async deleteProcessEquipments(processEquipments: Array<IdbProcessEquipment>) {
    for (let i = 0; i < processEquipments.length; i++) {
      await firstValueFrom(this.processEquipmentIdbService.deleteWithObservable(processEquipments[i].id))
    }
    await this.processEquipmentIdbService.setProcessEquipments();
  }

  async deleteKeyPerformanceMetricImpacts(keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>) {
    for (let i = 0; i < keyPerformanceMetricImpacts.length; i++) {
      await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.deleteWithObservable(keyPerformanceMetricImpacts[i].id));
    }
    await this.keyPerformanceMetricImpactsIdbService.setKeyPerformanceMetricImpacts();
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
      //TODO: update kpmImpacts
      // let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
      // let companyKeyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = keyPerformanceMetricImpacts.filter(metricImpact => {
      //   return metricImpact.companyId == keyPerformanceIndicators[i].companyId
      // });
      // let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.getCompanyNonEnergyBenefits(keyPerformanceIndicators[i].companyId);
      // if (nonEnergyBenefits.length > 0) {
      //   for (let b = 0; b < nonEnergyBenefits.length; b++) {
      //     let nonEnergyBenefit: IdbNonEnergyBenefit = nonEnergyBenefits[b];
      //     let kpiMetricValues: Array<KeyPerformanceMetricValue> = keyPerformanceIndicators[i].performanceMetrics.flatMap(metric => {
      //       return metric.value;
      //     });
      //     //remove metrics from this kpi
      //     nonEnergyBenefit.performanceMetricImpacts = nonEnergyBenefit.performanceMetricImpacts.filter(pmi => {
      //       return !kpiMetricValues.includes(pmi.kpmValue);
      //     });
      //     await firstValueFrom(this.nonEnergyBenefitsIdbService.updateWithObservable(nonEnergyBenefit));
      //   }
      //   await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
      // }
      await firstValueFrom(this.keyPerformanceIndicatorIdbService.deleteWithObservable(keyPerformanceIndicators[i].id));
    }
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
  }

  async deleteProcessEquipment(processEquipment: IdbProcessEquipment) {
    //update contacts
    let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    let equipmentContacts: Array<IdbContact> = contacts.filter(contact => { return contact.processEquipmentIds.includes(processEquipment.guid) });
    if (equipmentContacts.length > 0) {
      for (let a = 0; a < equipmentContacts.length; a++) {
        equipmentContacts[a].processEquipmentIds = equipmentContacts[a].processEquipmentIds.filter(pId => { return pId != processEquipment.guid });
        await firstValueFrom(this.contactIdbService.updateWithObservable(equipmentContacts[a]));
      }
      await this.contactIdbService.setContacts();
    }
    await firstValueFrom(this.processEquipmentIdbService.deleteWithObservable(processEquipment.id));
    await this.processEquipmentIdbService.setProcessEquipments();
  }


  async deleteEnergyEquipment(energyEquipment: IdbEnergyEquipment) {
    //update contacts
    let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    let equipmentContacts: Array<IdbContact> = contacts.filter(contact => { return contact.energyEquipmentIds.includes(energyEquipment.guid) });
    if (equipmentContacts.length > 0) {
      for (let a = 0; a < equipmentContacts.length; a++) {
        equipmentContacts[a].processEquipmentIds = equipmentContacts[a].energyEquipmentIds.filter(pId => { return pId != energyEquipment.guid });
        await firstValueFrom(this.contactIdbService.updateWithObservable(equipmentContacts[a]));
      }
      await this.contactIdbService.setContacts();
    }
    let assessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let equipmentAssessments: Array<IdbAssessment> = assessments.filter(assessment => {
      return assessment.equipmentId == energyEquipment.guid;
    });
    if (equipmentAssessments.length > 0) {
      for (let i = 0; i < equipmentAssessments.length; i++) {
        equipmentAssessments[i].equipmentId = undefined;
        await firstValueFrom(this.assessmentIdbService.updateWithObservable(equipmentAssessments[i]));
      }
      await this.assessmentIdbService.setAssessments();
    }
    await firstValueFrom(this.energyEquipmentIdbService.deleteWithObservable(energyEquipment.id));
    await this.energyEquipmentIdbService.setEnergyEquipments();
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

  // TODO: Multiple users, to set a new when the current is deleted
  // Wipe off the data under current user
  async deleteCurrentUserData(user: IdbUser) {
    let companies: Array<IdbCompany> = await firstValueFrom(this.companyIdbService.getAll());
    let userCompanies: Array<IdbCompany> = companies.filter(company => { return company.userId === user.guid });
    for (let i = 0; i < userCompanies.length; i++) {
      await this.deleteCompany(userCompanies[i]);
    }
  }

  async selectUser(user: IdbUser, skipUpdates: boolean) {
    // update user
    let updatedUser: IdbUser = await firstValueFrom(this.userIdbService.updateWithObservable(user));
    await this.companyIdbService.setCompanies();
    await this.facilityIdbService.setFacilities();
    await this.contactIdbService.setContacts();
    await this.energyOpportunityIdbService.setEnergyOpportunities();
    await this.assessmentIdbService.setAssessments();
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
    await this.onSiteVisitIdbService.setOnSiteVisits();
    await this.energyEquipmentIdbService.setEnergyEquipments();
    await this.processEquipmentIdbService.setProcessEquipments();
    this.userIdbService.user.next(user);
  }

}
