import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBuilding, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbUser } from 'src/app/models/user';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrl: './companies-table.component.css'
})
export class CompaniesTableComponent {

  faPlus: IconDefinition = faPlus;
  faBuilding: IconDefinition = faBuilding;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  displayAddNewModal: boolean;
  constructor(private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private router: Router,
    private userIdbService: UserIdbService) {
  }

  ngOnInit() {
    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
  }

  openAddNewModal() {
    this.displayAddNewModal = true;
  }

  closeAddNewModal() {
    this.displayAddNewModal = false;
  }

  async confirmCreate() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let newCompany: IdbCompany = getNewIdbCompany(user.guid);
    newCompany = await firstValueFrom(this.companyIdbService.addWithObservable(newCompany));
    await this.companyIdbService.setCompanies();
    this.router.navigateByUrl('/company/' + newCompany.guid + '/settings');
  }
}
