import { TestBed } from '@angular/core/testing';

import { OnSiteVisitIdbService } from './on-site-visit-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('OnSiteVisitIdbService', () => {
  let service: OnSiteVisitIdbService;

  let dbService: Partial<NgxIndexedDBService> = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(OnSiteVisitIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
