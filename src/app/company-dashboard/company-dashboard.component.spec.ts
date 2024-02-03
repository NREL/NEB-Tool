import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardComponent } from './company-dashboard.component';

describe('CompanyDashboardComponent', () => {
  let component: CompanyDashboardComponent;
  let fixture: ComponentFixture<CompanyDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyDashboardComponent]
    });
    fixture = TestBed.createComponent(CompanyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
