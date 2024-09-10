import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiDetailHelpComponent } from './company-kpi-detail-help.component';

describe('CompanyKpiDetailHelpComponent', () => {
  let component: CompanyKpiDetailHelpComponent;
  let fixture: ComponentFixture<CompanyKpiDetailHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyKpiDetailHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpiDetailHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
