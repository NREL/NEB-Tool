import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { CompanyDashboardModule } from './company-dashboard/company-dashboard.module';



@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CompanyDashboardModule
  ]
})
export class UserDashboardModule { }
