import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facility-dashboard-home',
  templateUrl: './facility-dashboard-home.component.html',
  styleUrls: ['./facility-dashboard-home.component.css']
})
export class FacilityDashboardHomeComponent {

  companyId: string = '';
  facilityId: string = '';
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.companyId = params['id'];
    });
  }
}
