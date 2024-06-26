import { Component, Input } from '@angular/core';
import { AssessmentReport } from 'src/app/models/reports';

@Component({
  selector: 'app-payback-table',
  templateUrl: './payback-table.component.html',
  styleUrl: './payback-table.component.css'
})
export class PaybackTableComponent {
  @Input({required: true})
  assessmentReport: AssessmentReport;

}
