import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { FacilityNamePipe } from './facility-name.pipe';
import { TestBed } from '@angular/core/testing';

describe('FacilityNamePipe', () => {
  it('create an instance', () => {
    let facilityIdbService: FacilityIdbService = TestBed.inject(FacilityIdbService);
    const pipe = new FacilityNamePipe(facilityIdbService);
    expect(pipe).toBeTruthy();
  });
});
