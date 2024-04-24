import { TestBed } from '@angular/core/testing';

import { ContactIdbService } from './contact-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('ContactIdbService', () => {
  let service: ContactIdbService;

  beforeEach(() => {
    let dbService: Partial<NgxIndexedDBService> = {}
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(ContactIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
