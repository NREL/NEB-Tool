import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOpportunityReportComponent } from './energy-opportunity-report.component';

describe('EnergyOpportunityReportComponent', () => {
  let component: EnergyOpportunityReportComponent;
  let fixture: ComponentFixture<EnergyOpportunityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyOpportunityReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyOpportunityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
