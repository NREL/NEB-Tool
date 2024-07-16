import { TestBed } from '@angular/core/testing';

import { ProcessEquipmentIdbService } from './process-equipment-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('ProcessEquipmentIdbService', () => {
  let service: ProcessEquipmentIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(ProcessEquipmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
