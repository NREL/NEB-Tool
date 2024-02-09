import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesListComponent } from './facilities-list.component';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';

describe('FacilitiesListComponent', () => {
  let component: FacilitiesListComponent;
  let fixture: ComponentFixture<FacilitiesListComponent>;

  beforeEach(() => {
    let companyDbServiceStub: Partial<CompanyIdbService> = {
      companies: new BehaviorSubject<Array<IdbCompany>>([]),
      selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
    };
    let facilityDbServiceStub: Partial<FacilityIdbService> = {
      facilities: new BehaviorSubject<Array<IdbFacility>>([]),
      selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
    }

    let projectDbService: Partial<ProjectIdbService> = {
      projects: new BehaviorSubject<Array<IdbProject>>([])
    }

    TestBed.configureTestingModule({
      declarations: [FacilitiesListComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyDbServiceStub },
        { provide: FacilityIdbService, useValue: facilityDbServiceStub },
        { provide: ProjectIdbService, useValue: projectDbService }
      ]
    });
    fixture = TestBed.createComponent(FacilitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
