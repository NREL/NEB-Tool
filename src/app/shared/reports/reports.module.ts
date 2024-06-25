import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentReportComponent } from './assessment-report/assessment-report.component';
import { RollupReportComponent } from './rollup-report/rollup-report.component';
import { HelperPipesModule } from '../helper-pipes/helper-pipes.module';
import { TableEntriesModule } from '../table-entries/table-entries.module';



@NgModule({
  declarations: [
    AssessmentReportComponent,
    RollupReportComponent
  ],
  imports: [
    CommonModule,
    HelperPipesModule,
    TableEntriesModule
  ],
  exports: [
    AssessmentReportComponent,
    RollupReportComponent
  ]
})
export class ReportsModule { }
