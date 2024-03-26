import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsTableComponent } from './user-dashboard-home/projects-table/projects-table.component';
import { CompaniesTableComponent } from './user-dashboard-home/companies-table/companies-table.component';
import { FacilitiesTableComponent } from './user-dashboard-home/facilities-table/facilities-table.component';
import { UserDashboardTabsComponent } from './user-dashboard-tabs/user-dashboard-tabs.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserDashboardHelpComponent } from './user-dashboard-help/user-dashboard-help.component';
import { ExploreNEBsComponent } from './explore-nebs/explore-nebs.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDashboardHomeComponent,
    ProjectsTableComponent,
    CompaniesTableComponent,
    FacilitiesTableComponent,
    UserDashboardTabsComponent,
    UserSettingsComponent,
    UserDashboardHelpComponent,
    ExploreNEBsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HelperPipesModule,
    FontAwesomeModule
  ]
})
export class UserDashboardModule { }
