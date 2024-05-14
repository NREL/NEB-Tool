import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { IconDefinition, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';

@Component({
  selector: 'app-company-kpi-setup',
  templateUrl: './company-kpi-setup.component.html',
  styleUrl: './company-kpi-setup.component.css'
})
export class CompanyKpiSetupComponent {

  faChartBar: IconDefinition = faChartBar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let companyGUID: string = params['id'];
      let selectedCompany: IdbCompany = this.companyIdbService.selectedCompany.getValue();
      if (!selectedCompany || selectedCompany.guid != companyGUID) {
        let company: IdbCompany = this.companyIdbService.getByGUID(companyGUID);
        this.companyIdbService.selectedCompany.next(company);
      }
    });
  }

  goBack() {
    let selectedCompany: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    this.router.navigateByUrl('setup-wizard/company-contacts/' + selectedCompany.guid);
  }

  goToFacility() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }
}
