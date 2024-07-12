import { Component, Input } from '@angular/core';
import { IconDefinition, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { AssessmentReport } from '../../calculations/assessmentReport';

@Component({
  selector: 'app-assessment-savings-table',
  templateUrl: './assessment-savings-table.component.html',
  styleUrl: './assessment-savings-table.component.css'
})
export class AssessmentSavingsTableComponent {
  @Input({required: true})
  assessmentReport: AssessmentReport;


  faWeightHanging: IconDefinition = faWeightHanging;
}
