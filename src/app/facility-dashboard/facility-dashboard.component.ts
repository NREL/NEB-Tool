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
      let companyGUID: string = params['id'];
      this.facilityIdbService.setSelectedFromGUID(companyGUID);
      //TODO: if no company matching id, navigate to dashboard
    });
  }
}
