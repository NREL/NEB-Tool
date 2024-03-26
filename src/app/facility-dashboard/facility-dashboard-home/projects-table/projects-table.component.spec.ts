import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTableComponent } from './projects-table.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { BehaviorSubject } from 'rxjs';
import { IdbProject } from 'src/app/models/project';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';

describe('ProjectsTableComponent', () => {
  let component: ProjectsTableComponent;
  let fixture: ComponentFixture<ProjectsTableComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let projectIdbService: Partial<ProjectIdbService> = {
    selectedProject: new BehaviorSubject<IdbProject>(undefined),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, HelperPipesModule],
      declarations: [ProjectsTableComponent],
      providers: [
        { provide: SetupWizardService, useValue: {} },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ProjectIdbService, useValue: projectIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
