import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-dashboard-home',
  templateUrl: './company-dashboard-home.component.html',
  styleUrls: ['./company-dashboard-home.component.css']
})
export class CompanyDashboardHomeComponent {

  companyId: string = '';
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.companyId = params['id'];
    });
  }
}
