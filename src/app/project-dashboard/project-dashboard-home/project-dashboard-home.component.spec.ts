import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardHomeComponent } from './project-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { BehaviorSubject } from 'rxjs';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { FormsModule } from '@angular/forms';

describe('ProjectDashboardHomeComponent', () => {
  let component: ProjectDashboardHomeComponent;
  let fixture: ComponentFixture<ProjectDashboardHomeComponent>;

  beforeEach(() => {
    let projectIdbService: Partial<ProjectIdbService> = {
      selectedProject: new BehaviorSubject<IdbProject>(getNewIdbProject('', '', '', ''))
    }
    let dbChangesService: Partial<DbChangesService> = {

    };
    let facilityIdbService: Partial<FacilityIdbService> = {
      facilities: new BehaviorSubject<Array<IdbFacility>>([])
    };
    let companyIdbService: Partial<CompanyIdbService> = {
      companies: new BehaviorSubject<Array<IdbCompany>>([])
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HelperPipesModule, FormsModule],
      declarations: [ProjectDashboardHomeComponent],
      providers: [
        { provide: ProjectIdbService, useValue: projectIdbService },
        { provide: DbChangesService, useValue: dbChangesService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    });
    fixture = TestBed.createComponent(ProjectDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
