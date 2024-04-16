import { Component } from '@angular/core';
import { CompanyIdbService } from '../indexed-db/company-idb.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent {

  constructor(private activatedRoute: ActivatedRoute, private companyIdbService: CompanyIdbService,
    private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let companyGUID: string = params['id'];
      let companyExists: boolean = this.companyIdbService.setSelectedFromGUID(companyGUID);
      if (!companyExists) {
        this.router.navigateByUrl('/user');
      }
    });
  }
}
