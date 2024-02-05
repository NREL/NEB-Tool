import { TestBed } from '@angular/core/testing';

import { ProjectIdbService } from './project-idb.service';

describe('ProjectIdbService', () => {
  let service: ProjectIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
