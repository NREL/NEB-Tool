import { TestBed } from '@angular/core/testing';

import { ProcessEquipmentIdbService } from './process-equipment-idb.service';

describe('ProcessEquipmentIdbService', () => {
  let service: ProcessEquipmentIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessEquipmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
