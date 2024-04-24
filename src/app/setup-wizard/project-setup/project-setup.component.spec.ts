import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetupComponent } from './project-setup.component';
import { SetupWizardService } from '../setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';

describe('ProjectSetupComponent', () => {
  let component: ProjectSetupComponent;
  let fixture: ComponentFixture<ProjectSetupComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([])
  };
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(undefined),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, FontAwesomeModule],
      declarations: [ProjectSetupComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: ProjectIdbService, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
