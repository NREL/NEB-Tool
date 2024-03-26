import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesTableComponent } from './facilities-table.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('FacilitiesTableComponent', () => {
  let component: FacilitiesTableComponent;
  let fixture: ComponentFixture<FacilitiesTableComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([])
  };
  let projectIdbService: Partial<ProjectIdbService> = {
    selectedProject: new BehaviorSubject<IdbProject>(undefined),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [FacilitiesTableComponent],    
      providers: [
      { provide: UserIdbService, useValue: userIdbService },
      { provide: CompanyIdbService, useValue: companyIdbService },
      { provide: FacilityIdbService, useValue: facilityIdbService },
      { provide: ProjectIdbService, useValue: projectIdbService },
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
