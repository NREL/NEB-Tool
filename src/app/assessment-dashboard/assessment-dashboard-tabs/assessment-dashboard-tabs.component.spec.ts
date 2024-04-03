import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardTabsComponent } from './assessment-dashboard-tabs.component';

describe('AssessmentDashboardTabsComponent', () => {
  let component: AssessmentDashboardTabsComponent;
  let fixture: ComponentFixture<AssessmentDashboardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentDashboardTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentDashboardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
