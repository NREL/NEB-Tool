import { TestBed } from '@angular/core/testing';

import { FacilityEnergyEquipmentSetupService } from './facility-energy-equipment-setup.service';

describe('FacilityEnergyEquipmentSetupService', () => {
  let service: FacilityEnergyEquipmentSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilityEnergyEquipmentSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
