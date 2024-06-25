import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentReportComponent } from './assessment-report/assessment-report.component';
import { RollupReportComponent } from './rollup-report/rollup-report.component';
import { HelperPipesModule } from '../helper-pipes/helper-pipes.module';
import { TableEntriesModule } from '../table-entries/table-entries.module';
import { EnergyOpportunityReportComponent } from './assessment-report/energy-opportunity-report/energy-opportunity-report.component';
import { NonEnergyBenefitReportComponent } from './assessment-report/non-energy-benefit-report/non-energy-benefit-report.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentSavingsTableComponent } from './assessment-report/assessment-savings-table/assessment-savings-table.component';



@NgModule({
  declarations: [
    AssessmentReportComponent,
    RollupReportComponent,
    EnergyOpportunityReportComponent,
    NonEnergyBenefitReportComponent,
    AssessmentSavingsTableComponent
  ],
  imports: [
    CommonModule,
    HelperPipesModule,
    TableEntriesModule,
    FontAwesomeModule
  ],
  exports: [
    AssessmentReportComponent,
    RollupReportComponent
  ]
})
export class ReportsModule { }
