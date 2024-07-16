import { TestBed } from '@angular/core/testing';

import { EnergyEquipmentIdbService } from './energy-equipment-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('EnergyEquipmentIdbService', () => {
  let service: EnergyEquipmentIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(EnergyEquipmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
