import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard.component';
import { ProjectDashboardHomeComponent } from './project-dashboard-home/project-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { ProjectDashboardTabsComponent } from './project-dashboard-tabs/project-dashboard-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { ManageProjectComponent } from './project-settings/manage-project/manage-project.component';



@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectDashboardHomeComponent,
    ProjectDashboardTabsComponent,
    ProjectSettingsComponent,
    ProjectReportComponent,
    ManageProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HelperPipesModule,
    FontAwesomeModule
  ]
})
export class ProjectDashboardModule { }
