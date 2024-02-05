import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardComponent } from './project-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectDashboardComponent', () => {
  let component: ProjectDashboardComponent;
  let fixture: ComponentFixture<ProjectDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProjectDashboardComponent]
    });
    fixture = TestBed.createComponent(ProjectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
