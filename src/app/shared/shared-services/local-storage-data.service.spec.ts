import { TestBed } from '@angular/core/testing';

import { LocalStorageDataService } from './local-storage-data.service';

describe('LocalStorageDataService', () => {
  let service: LocalStorageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
