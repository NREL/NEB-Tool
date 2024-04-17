import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardHomeComponent } from './assessment-dashboard-home.component';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('AssessmentDashboardHomeComponent', () => {
  let component: AssessmentDashboardHomeComponent;
  let fixture: ComponentFixture<AssessmentDashboardHomeComponent>;

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', ''))
  };
  let projectsIdbService: Partial<ProjectIdbService> = {
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }

  let companyIdbService: Partial<CompanyIdbService> = {};
  let facilityIdbService: Partial<FacilityIdbService> = {};
  let setupWizardService: Partial<SetupWizardService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, HelperPipesModule],
      declarations: [AssessmentDashboardHomeComponent],
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ProjectIdbService, useValue: projectsIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
