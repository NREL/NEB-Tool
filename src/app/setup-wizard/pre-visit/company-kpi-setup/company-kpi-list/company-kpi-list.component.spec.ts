import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiListComponent } from './company-kpi-list.component';

describe('CompanyKpiListComponent', () => {
  let component: CompanyKpiListComponent;
  let fixture: ComponentFixture<CompanyKpiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyKpiListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
