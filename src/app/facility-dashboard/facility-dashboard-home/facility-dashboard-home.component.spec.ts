import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardHomeComponent } from './facility-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { BehaviorSubject } from 'rxjs';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { FacilityDetailsFormComponent } from './facility-details-form/facility-details-form.component';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbProject } from 'src/app/models/project';
import { FormsModule } from '@angular/forms';

describe('FacilityDashboardHomeComponent', () => {
  let component: FacilityDashboardHomeComponent;
  let fixture: ComponentFixture<FacilityDashboardHomeComponent>;

  beforeEach(() => {
    let facilityIdbService: Partial<FacilityIdbService> = {
      selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
    }
    let projectIdbService: Partial<ProjectIdbService> = {
      projects: new BehaviorSubject<Array<IdbProject>>([])
    }
    let dbChangesService: Partial<DbChangesService> = {}
    let companyIdbService: Partial<CompanyIdbService> = {
      companies: new BehaviorSubject<Array<IdbCompany>>([])
    }
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HelperPipesModule, FormsModule],
      declarations: [FacilityDashboardHomeComponent, ProjectsListComponent, FacilityDetailsFormComponent],
      providers: [
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ProjectIdbService, useValue: projectIdbService },
        { provide: DbChangesService, useValue: dbChangesService },
        { provide: CompanyIdbService, useValue: companyIdbService }
      ]
    });
    fixture = TestBed.createComponent(FacilityDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
