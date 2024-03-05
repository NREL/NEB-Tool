import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardHomeComponent } from './user-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

describe('UserDashboardHomeComponent', () => {
  let component: UserDashboardHomeComponent;
  let fixture: ComponentFixture<UserDashboardHomeComponent>;

  beforeEach(() => {
    let userIdbService: Partial<UserIdbService> = {
      user: new BehaviorSubject<IdbUser>(getNewIdbUser())
    }
    let companyIdbService: Partial<CompanyIdbService> = {
      companies: new BehaviorSubject<Array<IdbCompany>>([])
    };
    let facilityIdbService: Partial<FacilityIdbService> = {
      facilities: new BehaviorSubject<Array<IdbFacility>>([])
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [UserDashboardHomeComponent, UserDetailsFormComponent, CompaniesListComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    });
    fixture = TestBed.createComponent(UserDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
