import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faFileLines, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessments-table',
  templateUrl: './assessments-table.component.html',
  styleUrl: './assessments-table.component.css'
})
export class AssessmentsTableComponent {
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;
  faFileLines: IconDefinition = faFileLines;

  facility: IdbFacility;
  facilitiesSub: Subscription;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  constructor(
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private sharedDataService: SharedDataService,
    private companyIdbService: CompanyIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService) {
  }

  ngOnInit() {
    this.facilitiesSub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    });
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });
  }

  ngOnDestroy() {
    this.facilitiesSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
  }

  openAddNewModal() {
    this.companyIdbService.setSelectedFromGUID(this.facility.companyId);
    this.onSiteVisitIdbService.selectedVisit.next(undefined);
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }
}
