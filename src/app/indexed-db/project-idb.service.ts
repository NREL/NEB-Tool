import { Injectable } from '@angular/core';
import { IdbProject } from '../models/project';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class ProjectIdbService {

  projects: BehaviorSubject<Array<IdbProject>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.projects = new BehaviorSubject<Array<IdbProject>>([]);
  }

  async initializeData() {
    let _projects: Array<IdbProject> = await firstValueFrom(this.getAll());
    this.projects.next(_projects);
  }

  getAll(): Observable<Array<IdbProject>> {
    return this.dbService.getAll('facility');
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
}
