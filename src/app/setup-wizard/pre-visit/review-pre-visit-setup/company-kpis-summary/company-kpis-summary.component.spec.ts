import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpisSummaryComponent } from './company-kpis-summary.component';

describe('CompanyKpisSummaryComponent', () => {
  let component: CompanyKpisSummaryComponent;
  let fixture: ComponentFixture<CompanyKpisSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyKpisSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpisSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
