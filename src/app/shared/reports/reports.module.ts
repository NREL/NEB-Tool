import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentReportComponent } from './assessment-report/assessment-report.component';
import { RollupReportComponent } from './rollup-report/rollup-report.component';
import { HelperPipesModule } from '../helper-pipes/helper-pipes.module';
import { TableEntriesModule } from '../table-entries/table-entries.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentSavingsTableComponent } from './assessment-report/assessment-savings-table/assessment-savings-table.component';
import { PaybackTableComponent } from './assessment-report/payback-table/payback-table.component';
import { PerformanceMetricsReportComponent } from './assessment-report/performance-metrics-report/performance-metrics-report.component';
import { AssessmentNebsSummaryTableComponent } from './assessment-nebs-summary-table/assessment-nebs-summary-table.component';



@NgModule({
  declarations: [
    AssessmentReportComponent,
    RollupReportComponent,
    AssessmentSavingsTableComponent,
    PaybackTableComponent,
    PerformanceMetricsReportComponent,
    AssessmentNebsSummaryTableComponent
  ],
  imports: [
    CommonModule,
    HelperPipesModule,
    TableEntriesModule,
    FontAwesomeModule
  ],
  exports: [
    AssessmentReportComponent,
    RollupReportComponent,
    AssessmentSavingsTableComponent,
    AssessmentNebsSummaryTableComponent
  ]
})
export class ReportsModule { }
