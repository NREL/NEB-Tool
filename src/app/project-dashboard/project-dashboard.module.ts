import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard.component';
import { ProjectDashboardHomeComponent } from './project-dashboard-home/project-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { ProjectDetailsFormComponent } from './project-dashboard-home/project-details-form/project-details-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectDashboardHomeComponent,
    ProjectDetailsFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ProjectDashboardModule { }
