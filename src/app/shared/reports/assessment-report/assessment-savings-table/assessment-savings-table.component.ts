import { Component, Input } from '@angular/core';
import { IconDefinition, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { AssessmentReport } from 'src/app/models/reports';

@Component({
  selector: 'app-assessment-savings-table',
  templateUrl: './assessment-savings-table.component.html',
  styleUrl: './assessment-savings-table.component.css'
})
export class AssessmentSavingsTableComponent {
  @Input({required: true})
  assessmentReport: AssessmentReport;
  @Input({required: true})
  assessment: IdbAssessment;


  faWeightHanging: IconDefinition = faWeightHanging;
}
