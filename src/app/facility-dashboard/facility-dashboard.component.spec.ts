import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardComponent } from './facility-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FacilityIdbService } from '../indexed-db/facility-idb.service';
import { FacilityDashboardTabsComponent } from './facility-dashboard-tabs/facility-dashboard-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { IdbFacility, getNewIdbFacility } from '../models/facility';

describe('FacilityDashboardComponent', () => {
  let component: FacilityDashboardComponent;
  let fixture: ComponentFixture<FacilityDashboardComponent>;

  beforeEach(() => {
    let facilityIdbService: Partial<FacilityIdbService> = {
      facilities: new BehaviorSubject<Array<IdbFacility>>([]),
      selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [FacilityDashboardComponent, FacilityDashboardTabsComponent],
      providers: [{ provide: FacilityIdbService, useValue: facilityIdbService }]
    });
    fixture = TestBed.createComponent(FacilityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
