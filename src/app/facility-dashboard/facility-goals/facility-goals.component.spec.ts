import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityGoalsComponent } from './facility-goals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { BehaviorSubject } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';

describe('FacilityGoalsComponent', () => {
  let component: FacilityGoalsComponent;
  let fixture: ComponentFixture<FacilityGoalsComponent>;

  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [FacilityGoalsComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: DbChangesService, useValue: {}}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
