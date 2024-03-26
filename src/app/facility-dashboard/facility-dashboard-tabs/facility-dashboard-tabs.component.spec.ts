import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardTabsComponent } from './facility-dashboard-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('FacilityDashboardTabsComponent', () => {
  let component: FacilityDashboardTabsComponent;
  let fixture: ComponentFixture<FacilityDashboardTabsComponent>;

  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [FacilityDashboardTabsComponent],
      providers: [
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FacilityDashboardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
