import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardComponent } from './facility-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FacilityDashboardComponent', () => {
  let component: FacilityDashboardComponent;
  let fixture: ComponentFixture<FacilityDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FacilityDashboardComponent]
    });
    fixture = TestBed.createComponent(FacilityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
