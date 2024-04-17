import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { BehaviorSubject } from 'rxjs';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { RouterTestingModule } from '@angular/router/testing';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([])
  };
  let sharedDataService: Partial<SharedDataService> = {
    sidebarOpen: new BehaviorSubject<boolean>(true)
  }
  let projectIdbService: Partial<ProjectIdbService> = {
    selectedProject: new BehaviorSubject<IdbProject>(getNewIdbProject('', '', '', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(undefined),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [SidebarComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: SharedDataService, useValue: sharedDataService },
        { provide: ProjectIdbService, useValue: projectIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
