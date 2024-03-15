import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilityIdbService } from '../indexed-db/facility-idb.service';

@Component({
  selector: 'app-facility-dashboard',
  templateUrl: './facility-dashboard.component.html',
  styleUrls: ['./facility-dashboard.component.css']
})
export class FacilityDashboardComponent {

  constructor(private activatedRoute: ActivatedRoute, private facilityIdbService: FacilityIdbService,
    private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let facilityGUID: string = params['id'];
      let facilityExists: boolean = this.facilityIdbService.setSelectedFromGUID(facilityGUID);
      if(!facilityExists){
        this.router.navigateByUrl('/user');
      }
    });
  }
}
