import { Pipe, PipeTransform } from '@angular/core';
import { IdbProject } from 'src/app/models/project';

@Pipe({
  name: 'projectDisplay'
})
export class ProjectDisplayPipe implements PipeTransform {

  transform(guid: string, projects: Array<IdbProject>): string {
    let project: IdbProject = projects.find(prj => {
      return prj.guid == guid
    });
    if (project) {
      return project.name
    }
    return null;
  }

}
