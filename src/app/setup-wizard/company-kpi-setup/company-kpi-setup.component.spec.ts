import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiSetupComponent } from './company-kpi-setup.component';

describe('CompanyKpiSetupComponent', () => {
  let component: CompanyKpiSetupComponent;
  let fixture: ComponentFixture<CompanyKpiSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyKpiSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpiSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
