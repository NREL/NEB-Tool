import { Pipe, PipeTransform } from '@angular/core';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Pipe({
  name: 'facilityList'
})
export class FacilityListPipe implements PipeTransform {

  constructor(private facilityIdbService: FacilityIdbService) {
  }

  transform(companyGUID: string): Array<IdbFacility> {
    let allFacilities: Array<IdbFacility> = this.facilityIdbService.facilities.getValue();
    return allFacilities.filter(facility => { return facility.companyId == companyGUID });
  }

}
