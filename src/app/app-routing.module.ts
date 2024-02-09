import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { PageNotFoundComponent } from './core-components/page-not-found/page-not-found.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardHomeComponent } from './user-dashboard/user-dashboard-home/user-dashboard-home.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyDashboardHomeComponent } from './company-dashboard/company-dashboard-home/company-dashboard-home.component';
import { FacilityDashboardComponent } from './facility-dashboard/facility-dashboard.component';
import { FacilityDashboardHomeComponent } from './facility-dashboard/facility-dashboard-home/facility-dashboard-home.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectDashboardHomeComponent } from './project-dashboard/project-dashboard-home/project-dashboard-home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    children: [
      {
        path: '',
        component: UserDashboardHomeComponent
      },
      {
        path: 'company/:id',
        component: CompanyDashboardComponent,
        children: [
          {
            path: '',
            component: CompanyDashboardHomeComponent
          },
          {
            path: 'facility/:id',
            component: FacilityDashboardComponent,
            children: [
              {
                path: '',
                component: FacilityDashboardHomeComponent
              },
              {
                path: 'project/:id',
                component: ProjectDashboardComponent,
                children: [
                  {
                    path: '',
                    component: ProjectDashboardHomeComponent
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  //wildcard/page not found needs to be last route
  //triggered after entire route tree is checked
  { path: "**", component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
