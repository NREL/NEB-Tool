import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard.component';
import { ProjectDashboardHomeComponent } from './project-dashboard-home/project-dashboard-home.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectDashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ProjectDashboardModule { }
