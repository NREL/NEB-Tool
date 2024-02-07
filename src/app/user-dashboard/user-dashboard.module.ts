import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { CompaniesListComponent } from './user-dashboard-home/companies-list/companies-list.component';
import { UserDetailsFormComponent } from './user-dashboard-home/user-details-form/user-details-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDashboardHomeComponent,
    CompaniesListComponent,
    UserDetailsFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class UserDashboardModule { }
