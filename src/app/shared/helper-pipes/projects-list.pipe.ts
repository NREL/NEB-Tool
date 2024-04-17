import { Pipe, PipeTransform } from '@angular/core';
import { IdbProject } from 'src/app/models/project';

@Pipe({
  name: 'projectsList'
})
export class ProjectsListPipe implements PipeTransform {

  transform(contextGUID: string, allProjects: Array<IdbProject>, context: 'company' | 'facility' | 'assessment'): Array<IdbProject> {
    if (context == 'company') {
      return allProjects.filter(project => { return project.facilityId == contextGUID });
    } else if(context == 'facility') {
      return allProjects.filter(project => { return project.companyId == contextGUID });
    } else if(context == 'assessment') {
      return allProjects.filter(project => { return project.assessmentId == contextGUID });
    }
    return [];
  }
}
