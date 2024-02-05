import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardHomeComponent } from './project-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectDashboardHomeComponent', () => {
  let component: ProjectDashboardHomeComponent;
  let fixture: ComponentFixture<ProjectDashboardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProjectDashboardHomeComponent]
    });
    fixture = TestBed.createComponent(ProjectDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
