import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiSelectComponent } from './company-kpi-select.component';

describe('CompanyKpiSelectComponent', () => {
  let component: CompanyKpiSelectComponent;
  let fixture: ComponentFixture<CompanyKpiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyKpiSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
