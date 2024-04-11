import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardHomeComponent } from './user-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { CompaniesTableComponent } from './companies-table/companies-table.component';
import { FacilitiesTableComponent } from './facilities-table/facilities-table.component';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentsTableComponent } from './assessments-table/assessments-table.component';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';

describe('UserDashboardHomeComponent', () => {
  let component: UserDashboardHomeComponent;
  let fixture: ComponentFixture<UserDashboardHomeComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([])
  };
  let projectIdbService: Partial<ProjectIdbService> = {
    selectedProject: new BehaviorSubject<IdbProject>(undefined),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(undefined),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, FontAwesomeModule],
      declarations: [UserDashboardHomeComponent, CompaniesTableComponent, FacilitiesTableComponent, ProjectsTableComponent, AssessmentsTableComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ProjectIdbService, useValue: projectIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
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
