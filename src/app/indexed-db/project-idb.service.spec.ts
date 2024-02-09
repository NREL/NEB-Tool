import { TestBed } from '@angular/core/testing';

import { ProjectIdbService } from './project-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('ProjectIdbService', () => {
  let service: ProjectIdbService;

  beforeEach(() => {
    let dbService: Partial<NgxIndexedDBService> = {}
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(ProjectIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
