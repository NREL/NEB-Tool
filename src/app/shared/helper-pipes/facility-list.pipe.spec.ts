import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { FacilityListPipe } from './facility-list.pipe';
import { TestBed } from '@angular/core/testing';

describe('FacilityListPipe', () => {
  it('create an instance', () => {
    let facilityIdbService: FacilityIdbService = TestBed.inject(FacilityIdbService);
    const pipe = new FacilityListPipe(facilityIdbService);
    expect(pipe).toBeTruthy();
  });
});
