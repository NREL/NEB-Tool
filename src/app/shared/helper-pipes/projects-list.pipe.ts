import { Pipe, PipeTransform } from '@angular/core';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';

@Pipe({
  name: 'projectsList'
})
export class ProjectsListPipe implements PipeTransform {

  constructor(private projectIdbService: ProjectIdbService) {
  }

  transform(facilityGUID: string): Array<IdbProject> {
    let allProjects: Array<IdbProject> = this.projectIdbService.projects.getValue();
    return allProjects.filter(project => { return project.facilityId == facilityGUID });
  }
}
