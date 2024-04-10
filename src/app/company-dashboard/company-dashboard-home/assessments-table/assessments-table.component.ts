import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faFileLines, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-assessments-table',
  templateUrl: './assessments-table.component.html',
  styleUrl: './assessments-table.component.css'
})
export class AssessmentsTableComponent {

  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;
  faFileLines: IconDefinition = faFileLines;

  company: IdbCompany;
  companySub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  displayAddNewModal: boolean = false;
  constructor(private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private router: Router,
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    })
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
  }

  openAddNewModal() {
    this.displayAddNewModal = true;
  }

  closeAddNewModal() {
    this.displayAddNewModal = false;
  }

  confirmCreate() {
    this.setupWizardService.company.next(this.company);
    this.router.navigateByUrl('/setup-wizard');
  }
}
