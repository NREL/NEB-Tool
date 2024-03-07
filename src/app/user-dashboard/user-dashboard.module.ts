import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { CompaniesListComponent } from './user-dashboard-home/companies-list/companies-list.component';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDashboardHomeComponent,
    CompaniesListComponent
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
