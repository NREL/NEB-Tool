import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFacilityComponent } from './manage-facility.component';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { BehaviorSubject } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ManageFacilityComponent', () => {
  let component: ManageFacilityComponent;
  let fixture: ComponentFixture<ManageFacilityComponent>;

  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ManageFacilityComponent],    
      providers: [
      { provide: DbChangesService, useValue: {} },
      { provide: FacilityIdbService, useValue: facilityIdbService },
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
