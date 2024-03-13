import { Pipe, PipeTransform } from '@angular/core';
import { IdbProject } from 'src/app/models/project';

@Pipe({
  name: 'projectsList'
})
export class ProjectsListPipe implements PipeTransform {

  transform(facilityOrCompanyGUID: string, allProjects: Array<IdbProject>, isCompany?: boolean): Array<IdbProject> {
    if (!isCompany) {
      return allProjects.filter(project => { return project.facilityId == facilityOrCompanyGUID });
    } else {
      return allProjects.filter(project => { return project.companyId == facilityOrCompanyGUID });
    }
  }
}
