import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentReportComponent } from './assessment-report/assessment-report.component';
import { RollupReportComponent } from './rollup-report/rollup-report.component';



@NgModule({
  declarations: [
    AssessmentReportComponent,
    RollupReportComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AssessmentReportComponent,
    RollupReportComponent
  ]
})
export class ReportsModule { }
