import { Pipe, PipeTransform } from '@angular/core';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Pipe({
  name: 'facilityName'
})
export class FacilityNamePipe implements PipeTransform {

  constructor(private facilityIdbService: FacilityIdbService) {
  }

  transform(facilityGUID: string): string {
    let facility: IdbFacility = this.facilityIdbService.getByGUID(facilityGUID);
    if (facility) {
      return facility.name;
    }
    return '';
  }

}
