import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardTabsComponent } from './company-dashboard-tabs.component';

describe('CompanyDashboardTabsComponent', () => {
  let component: CompanyDashboardTabsComponent;
  let fixture: ComponentFixture<CompanyDashboardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyDashboardTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyDashboardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
