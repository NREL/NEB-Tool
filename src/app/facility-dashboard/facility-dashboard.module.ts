import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityDashboardComponent } from './facility-dashboard.component';
import { FacilityDashboardHomeComponent } from './facility-dashboard-home/facility-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { ProjectsListComponent } from './facility-dashboard-home/projects-list/projects-list.component';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FacilityProductionDetailsComponent } from './facility-dashboard-home/facility-production-details/facility-production-details.component';
import { FacilityDashboardTabsComponent } from './facility-dashboard-tabs/facility-dashboard-tabs.component';
import { FacilitySettingsComponent } from './facility-settings/facility-settings.component';
import { FacilityReportsComponent } from './facility-reports/facility-reports.component';
import { ProjectsTableComponent } from './facility-dashboard-home/projects-table/projects-table.component';



@NgModule({
  declarations: [
    FacilityDashboardComponent,
    FacilityDashboardHomeComponent,
    ProjectsListComponent,
    FacilityProductionDetailsComponent,
    FacilityDashboardTabsComponent,
    FacilitySettingsComponent,
    FacilityReportsComponent,
    ProjectsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HelperPipesModule,
    SharedSettingsFormsModule,
    FontAwesomeModule
  ]
})
export class FacilityDashboardModule { }
