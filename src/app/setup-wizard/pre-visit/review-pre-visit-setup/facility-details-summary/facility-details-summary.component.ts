import { Component } from '@angular/core';
import { IconDefinition, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-details-summary',
  templateUrl: './facility-details-summary.component.html',
  styleUrl: './facility-details-summary.component.css'
})
export class FacilityDetailsSummaryComponent {

  facility: IdbFacility;
  faIndustry: IconDefinition = faIndustry;
  constructor(private facilityIdbService: FacilityIdbService){

  }

  ngOnInit(){
    this.facility = this.facilityIdbService.selectedFacility.getValue();
  }
}
