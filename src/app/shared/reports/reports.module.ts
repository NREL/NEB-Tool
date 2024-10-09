import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentReportComponent } from './assessment-report/assessment-report.component';
import { HelperPipesModule } from '../helper-pipes/helper-pipes.module';
import { TableEntriesModule } from '../table-entries/table-entries.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentSavingsTableComponent } from './assessment-report/assessment-savings-table/assessment-savings-table.component';
import { PaybackTableComponent } from './assessment-report/payback-table/payback-table.component';
import { PerformanceMetricsChartComponent } from './performance-metrics-chart/performance-metrics-chart.component';
import { AssessmentSavingsChartComponent } from './assessment-report/assessment-savings-chart/assessment-savings-chart.component';
import { OnSiteVisitReportComponent } from './on-site-visit-report/on-site-visit-report.component';
import { ReportDetailsTableComponent } from './report-details-table/report-details-table.component';
import { PerformanceMetricsTableComponent } from './performance-metrics-table/performance-metrics-table.component';
import { PerformanceMetricsTablePipe } from './performance-metrics-table/performance-metrics-table.pipe';



@NgModule({
  declarations: [
    AssessmentReportComponent,
    AssessmentSavingsTableComponent,
    PaybackTableComponent,
    PerformanceMetricsChartComponent,
    AssessmentSavingsChartComponent,
    OnSiteVisitReportComponent,
    ReportDetailsTableComponent,
    PerformanceMetricsTableComponent,
    PerformanceMetricsTablePipe
  ],
  imports: [
    CommonModule,
    HelperPipesModule,
    TableEntriesModule,
    FontAwesomeModule
  ],
  exports: [
    AssessmentReportComponent,
    AssessmentSavingsTableComponent,
    AssessmentSavingsChartComponent,
    OnSiteVisitReportComponent
  ]
})
export class ReportsModule { }
