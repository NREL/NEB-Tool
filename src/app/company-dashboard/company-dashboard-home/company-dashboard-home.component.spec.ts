import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardHomeComponent } from './company-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompanyDashboardHomeComponent', () => {
  let component: CompanyDashboardHomeComponent;
  let fixture: ComponentFixture<CompanyDashboardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CompanyDashboardHomeComponent]
    });
    fixture = TestBed.createComponent(CompanyDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
