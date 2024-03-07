import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacilityIdbService } from '../indexed-db/facility-idb.service';

@Component({
  selector: 'app-facility-dashboard',
  templateUrl: './facility-dashboard.component.html',
  styleUrls: ['./facility-dashboard.component.css']
})
export class FacilityDashboardComponent {

  constructor(private activatedRoute: ActivatedRoute, private facilityIdbService: FacilityIdbService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let facilityGUID: string = params['id'];
      this.facilityIdbService.setSelectedFromGUID(facilityGUID);
    });
  }
}
