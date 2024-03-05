import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core-components/navbar/navbar.component';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { PageNotFoundComponent } from './core-components/page-not-found/page-not-found.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { CompanyDashboardModule } from './company-dashboard/company-dashboard.module';
import { FacilityDashboardModule } from './facility-dashboard/facility-dashboard.module';
import { ProjectDashboardModule } from './project-dashboard/project-dashboard.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IndexedDbModule } from './indexed-db/indexed-db.module';
import { LoadingComponent } from './core-components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserDashboardModule,
    CompanyDashboardModule,
    FacilityDashboardModule,
    ProjectDashboardModule,
    FontAwesomeModule,
    IndexedDbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
