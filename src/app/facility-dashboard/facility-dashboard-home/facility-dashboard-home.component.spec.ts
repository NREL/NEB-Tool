import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardHomeComponent } from './facility-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FacilityDashboardHomeComponent', () => {
  let component: FacilityDashboardHomeComponent;
  let fixture: ComponentFixture<FacilityDashboardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FacilityDashboardHomeComponent]
    });
    fixture = TestBed.createComponent(FacilityDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
