import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardTabsComponent } from './project-dashboard-tabs.component';

describe('ProjectDashboardTabsComponent', () => {
  let component: ProjectDashboardTabsComponent;
  let fixture: ComponentFixture<ProjectDashboardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDashboardTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectDashboardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
