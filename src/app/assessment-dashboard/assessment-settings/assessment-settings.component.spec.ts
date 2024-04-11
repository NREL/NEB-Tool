import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSettingsComponent } from './assessment-settings.component';
import { ManageAssessmentComponent } from './manage-assessment/manage-assessment.component';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

describe('AssessmentSettingsComponent', () => {
  let component: AssessmentSettingsComponent;
  let fixture: ComponentFixture<AssessmentSettingsComponent>;

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', ''))
  };
  let companyIdbService: Partial<CompanyIdbService> = {};
  let facilityIdbService: Partial<FacilityIdbService> = {};
  let projectsIdbService: Partial<ProjectIdbService> = {
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [AssessmentSettingsComponent, ManageAssessmentComponent],
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ProjectIdbService, useValue: projectsIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
