import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardTabsComponent } from './facility-dashboard-tabs.component';

describe('FacilityDashboardTabsComponent', () => {
  let component: FacilityDashboardTabsComponent;
  let fixture: ComponentFixture<FacilityDashboardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityDashboardTabsComponent]
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
