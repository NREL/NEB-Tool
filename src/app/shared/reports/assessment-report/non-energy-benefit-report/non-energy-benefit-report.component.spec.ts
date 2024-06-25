import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonEnergyBenefitReportComponent } from './non-energy-benefit-report.component';

describe('NonEnergyBenefitReportComponent', () => {
  let component: NonEnergyBenefitReportComponent;
  let fixture: ComponentFixture<NonEnergyBenefitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NonEnergyBenefitReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NonEnergyBenefitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
