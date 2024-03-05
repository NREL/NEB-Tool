import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-details-form',
  templateUrl: './facility-details-form.component.html',
  styleUrls: ['./facility-details-form.component.css']
})
export class FacilityDetailsFormComponent {

  facility: IdbFacility;
  facilitySub: Subscription;

  constructor(private facilityIdbService: FacilityIdbService) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
  }

  async saveChanges(){
    await this.facilityIdbService.asyncUpdate(this.facility);
  }
}
