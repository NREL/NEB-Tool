import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardHomeComponent } from './company-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { FormsModule } from '@angular/forms';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { FacilitiesTableComponent } from './facilities-table/facilities-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('CompanyDashboardHomeComponent', () => {
  let component: CompanyDashboardHomeComponent;
  let fixture: ComponentFixture<CompanyDashboardHomeComponent>;

  beforeEach(() => {
    let companyDbServiceStub: Partial<CompanyIdbService> = {
      companies: new BehaviorSubject<Array<IdbCompany>>([]),
      selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
    };
    let facilityDbServiceStub: Partial<FacilityIdbService> = {
      facilities: new BehaviorSubject<Array<IdbFacility>>([]),
      selectedFacility: new BehaviorSubject<IdbFacility>(undefined)
    }
    let projectDbService: Partial<ProjectIdbService> = {
      projects: new BehaviorSubject<Array<IdbProject>>([])
    }
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyDashboardHomeComponent, ProjectsTableComponent, FacilitiesTableComponent],
      providers: [
        {provide: CompanyIdbService, useValue: companyDbServiceStub},
        {provide: FacilityIdbService, useValue: facilityDbServiceStub},
        {provide: DbChangesService, useValue: {}},
        { provide: ProjectIdbService, useValue: projectDbService }
      ]
    });
    fixture = TestBed.createComponent(CompanyDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
