import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardComponent } from './facility-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FacilityIdbService } from '../indexed-db/facility-idb.service';

describe('FacilityDashboardComponent', () => {
  let component: FacilityDashboardComponent;
  let fixture: ComponentFixture<FacilityDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FacilityDashboardComponent],
      providers: [{ provide: FacilityIdbService, useValue: {} }]
    });
    fixture = TestBed.createComponent(FacilityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
