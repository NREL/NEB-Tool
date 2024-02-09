import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { ProjectsListPipe } from './projects-list.pipe';
import { TestBed } from '@angular/core/testing';

describe('ProjectsListPipe', () => {
  it('create an instance', () => {
    let projectIdbService: ProjectIdbService = TestBed.inject(ProjectIdbService);
    const pipe = new ProjectsListPipe(projectIdbService);
    expect(pipe).toBeTruthy();
  });
});
