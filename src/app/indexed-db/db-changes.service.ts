import { Injectable } from '@angular/core';
import { CompanyIdbService } from './company-idb.service';
import { FacilityIdbService } from './facility-idb.service';
import { ProjectIdbService } from './project-idb.service';
import { IdbProject } from '../models/project';
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

@Injectable({
  providedIn: 'root'
})
export class DbChangesService {

  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService, private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService) { }


  //TODO: loading service messaging and success toast notification
  async deleteCompany(company: IdbCompany) {
    //delete contacts
    let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    let companyContacts: Array<IdbContact> = contacts.filter(contact => { return contact.companyId == company.guid });
    await this.deleteContacts(companyContacts);
    //delete projects
    let projects: Array<IdbProject> = this.projectIdbService.projects.getValue();
    let companyProjects: Array<IdbProject> = projects.filter(project => { return project.companyId == company.guid });
    await this.deleteProjects(companyProjects);
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
    //delete projects
    let projects: Array<IdbProject> = this.projectIdbService.projects.getValue();
    let facilityProjects: Array<IdbProject> = projects.filter(project => { return project.facilityId == facility.guid });
    await this.deleteProjects(facilityProjects)
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
    //delete projects
    let projects: Array<IdbProject> = this.projectIdbService.projects.getValue();
    let assessmentProjects: Array<IdbProject> = projects.filter(project => { return project.assessmentId == assessment.guid });
    await this.deleteProjects(assessmentProjects);
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

  async deleteAssessments(assessments: Array<IdbAssessment>) {
    for (let i = 0; i < assessments.length; i++) {
      await firstValueFrom(this.assessmentIdbService.deleteWithObservable(assessments[i].id));
    }
    await this.assessmentIdbService.setAssessments();
  }

  async deleteProjects(projects: Array<IdbProject>) {
    for (let i = 0; i < projects.length; i++) {
      await firstValueFrom(this.projectIdbService.deleteWithObservable(projects[i].id));
    }
    await this.projectIdbService.setProjects();
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
}
