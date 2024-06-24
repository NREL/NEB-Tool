import { Component, Input } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';

@Component({
  selector: 'app-assessment-report',
  templateUrl: './assessment-report.component.html',
  styleUrl: './assessment-report.component.css'
})
export class AssessmentReportComponent {
  @Input({required: true})
  assessment: IdbAssessment;

  constructor(){

  }

  ngOnInit(){
    
  }
}
