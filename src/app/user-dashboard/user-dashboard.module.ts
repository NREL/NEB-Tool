import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UserDashboardModule { }
