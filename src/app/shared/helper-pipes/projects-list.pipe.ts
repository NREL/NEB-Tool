import { Pipe, PipeTransform } from '@angular/core';
import { IdbProject } from 'src/app/models/project';

@Pipe({
  name: 'projectsList'
})
export class ProjectsListPipe implements PipeTransform {

  transform(facilityGUID: string, allProjects: Array<IdbProject>): Array<IdbProject> {
    return allProjects.filter(project => { return project.facilityId == facilityGUID });
  }
}
