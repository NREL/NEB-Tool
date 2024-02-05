import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class ProjectIdbService {

  projects: BehaviorSubject<Array<Project>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.projects = new BehaviorSubject<Array<Project>>([]);
  }

  getAll(): Observable<Array<Project>> {
    return this.dbService.getAll('facility');
  }

  getById(id: number): Observable<Project> {
    return this.dbService.getByKey('project', id);
  }

  addWithObservable(project: Project): Observable<Project> {
    return this.dbService.add('project', project);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('project', id);
  }

  updateWithObservable(project: Project): Observable<Project> {
    project.setModifiedDate();
    return this.dbService.update('project', project);
  }
}
