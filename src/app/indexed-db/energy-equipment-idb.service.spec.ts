import { TestBed } from '@angular/core/testing';

import { EnergyEquipmentIdbService } from './energy-equipment-idb.service';

describe('EnergyEquipmentIdbService', () => {
  let service: EnergyEquipmentIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyEquipmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
