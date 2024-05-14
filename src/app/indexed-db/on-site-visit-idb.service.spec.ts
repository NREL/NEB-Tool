import { TestBed } from '@angular/core/testing';

import { OnSiteVisitIdbService } from './on-site-visit-idb.service';

describe('OnSiteVisitIdbService', () => {
  let service: OnSiteVisitIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnSiteVisitIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
