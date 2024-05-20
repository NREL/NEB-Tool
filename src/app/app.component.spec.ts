import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core-components/navbar/navbar.component';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { CompanyIdbService } from './indexed-db/company-idb.service';
import { FacilityIdbService } from './indexed-db/facility-idb.service';
import { UserIdbService } from './indexed-db/user-idb.service';
import { ProjectIdbService } from './indexed-db/project-idb.service';
import { LoadingComponent } from './core-components/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentIdbService } from './indexed-db/assessment-idb.service';
import { ContactIdbService } from './indexed-db/contact-idb.service';
import { NonEnergyBenefitsIdbService } from './indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from './indexed-db/on-site-visit-idb.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [AppComponent, NavbarComponent, WelcomeComponent, LoadingComponent],
      providers: [
        { provide: CompanyIdbService, useValue: {} },
        { provide: FacilityIdbService, useValue: {} },
        { provide: UserIdbService, useValue: {} },
        { provide: ProjectIdbService, useValue: {} },
        { provide: AssessmentIdbService, useValue: {} },
        { provide: ContactIdbService, useValue: {} },
        { provide: NonEnergyBenefitsIdbService, useValue: {} },
        { provide: OnSiteVisitIdbService, useValue: {} }
      ]
    })
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
