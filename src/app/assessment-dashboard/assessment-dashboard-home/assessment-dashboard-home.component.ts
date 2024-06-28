import { Component } from '@angular/core';
import { IconDefinition, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-dashboard-home',
  templateUrl: './assessment-dashboard-home.component.html',
  styleUrl: './assessment-dashboard-home.component.css'
})
export class AssessmentDashboardHomeComponent {

  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  constructor(private assessmentIdbService: AssessmentIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_selectedAssessment => {
      this.assessment = _selectedAssessment;
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
  }

  openEditModal() {
    this.facilityIdbService.setSelectedFromGUID(this.assessment.facilityId);
    this.companyIdbService.setSelectedFromGUID(this.assessment.companyId);
    this.onSiteVisitIdbService.setSelectedFromAssessmentGUID(this.assessment.guid);
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }
}
