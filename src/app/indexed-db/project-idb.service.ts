import { Injectable } from '@angular/core';
import { IdbProject } from '../models/project';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class ProjectIdbService {

  projects: BehaviorSubject<Array<IdbProject>>;
  selectedProject: BehaviorSubject<IdbProject>;
  constructor(private dbService: NgxIndexedDBService) {
    this.projects = new BehaviorSubject<Array<IdbProject>>([]);
    this.selectedProject = new BehaviorSubject<IdbProject>(undefined);
  }

  async setProjects() {
    let _projects: Array<IdbProject> = await firstValueFrom(this.getAll());
    this.projects.next(_projects);
  }

  getAll(): Observable<Array<IdbProject>> {
    return this.dbService.getAll('project');
  }

  getById(id: number): Observable<IdbProject> {
    return this.dbService.getByKey('project', id);
  }

  addWithObservable(project: IdbProject): Observable<IdbProject> {
    return this.dbService.add('project', project);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('project', id);
  }

  updateWithObservable(project: IdbProject): Observable<IdbProject> {
    project.modifiedDate = new Date();
    return this.dbService.update('project', project);
  } 

  setSelectedFromGUID(guid: string): boolean {
    let projects: Array<IdbProject> = this.projects.getValue();
    let project: IdbProject = projects.find(_project => { return _project.guid == guid });
    this.selectedProject.next(project);
    return project != undefined;
  }

  async asyncUpdate(project: IdbProject) {
    project = await firstValueFrom(this.updateWithObservable(project));
    await this.setProjects();
    this.selectedProject.next(project);
  }
}
