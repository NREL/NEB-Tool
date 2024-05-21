import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faFileLines, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';

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

  displayAddNewModal: boolean = false;
  constructor(
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private router: Router) {
  }

  ngOnInit() {
    this.facilitiesSub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    });
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    })
  }

  ngOnDestroy() {
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
    //TODO: Issue #75
    this.router.navigateByUrl('/setup-wizard');
  }

}
