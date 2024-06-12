import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiDetailsComponent } from './company-kpi-details.component';

describe('CompanyKpiDetailsComponent', () => {
  let component: CompanyKpiDetailsComponent;
  let fixture: ComponentFixture<CompanyKpiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyKpiDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
