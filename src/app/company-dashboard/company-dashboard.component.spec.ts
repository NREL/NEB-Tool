import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardComponent } from './company-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompanyDashboardComponent', () => {
  let component: CompanyDashboardComponent;
  let fixture: ComponentFixture<CompanyDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
