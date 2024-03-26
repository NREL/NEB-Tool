import { TestBed } from '@angular/core/testing';

import { LocalStorageDataService } from './local-storage-data.service';
import { LocalStorageService } from 'ngx-webstorage';

describe('LocalStorageDataService', () => {
  let service: LocalStorageDataService;

  let localStorageService: Partial<LocalStorageService> = {
    retrieve: () => { return undefined },
    store: () => { return undefined },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageService }
      ]
    });
    service = TestBed.inject(LocalStorageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
