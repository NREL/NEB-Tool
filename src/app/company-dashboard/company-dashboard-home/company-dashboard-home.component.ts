import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbCompany } from 'src/app/models/company';
@Component({
  selector: 'app-company-dashboard-home',
  templateUrl: './company-dashboard-home.component.html',
  styleUrls: ['./company-dashboard-home.component.css']
})
export class CompanyDashboardHomeComponent {

  faBuilding: IconDefinition = faBuilding;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;
  constructor(private companyIdbService: CompanyIdbService,
    private dbChangesService: DbChangesService,
    private router: Router) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
    });
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
  }

  async deleteCompany(){
    await this.dbChangesService.deleteCompany(this.selectedCompany);
    this.router.navigateByUrl('/user')
  }
}
