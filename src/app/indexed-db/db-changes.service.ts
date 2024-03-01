import { Injectable } from '@angular/core';
import { CompanyIdbService } from './company-idb.service';
import { FacilityIdbService } from './facility-idb.service';
import { ProjectIdbService } from './project-idb.service';
import { IdbProject } from '../models/project';
import { firstValueFrom } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { IdbCompany } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class DbChangesService {

  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService) { }


  //TODO: loading service messaging and success toast notification
  async deleteCompany(company: IdbCompany) {
    //delete projects
    let projects: Array<IdbProject> = this.projectIdbService.projects.getValue();
    let companyProjects: Array<IdbProject> = projects.filter(project => { return project.companyId == company.guid });
    await this.deleteProjects(companyProjects)
    //delete facilities
    let facilities: Array<IdbFacility> = this.facilityIdbService.facilities.getValue();
    let companyFacilities: Array<IdbFacility> = facilities.filter(facility => { return facility.companyId == company.guid });
    await this.deleteFacilities(companyFacilities);
    //delete company
    await firstValueFrom(this.companyIdbService.deleteWithObservable(company.id))
    await this.companyIdbService.setCompanies();
  }

  async deleteFacility(facility: IdbFacility) {
    let projects: Array<IdbProject> = this.projectIdbService.projects.getValue();
    let companyProjects: Array<IdbProject> = projects.filter(project => { return project.facilityId == facility.guid });
    await this.deleteProjects(companyProjects)
    //delete facility
    await this.deleteFacilities([facility]);
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
}