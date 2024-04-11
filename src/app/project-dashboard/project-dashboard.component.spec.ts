import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardComponent } from './project-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectIdbService } from '../indexed-db/project-idb.service';
import { ProjectDashboardTabsComponent } from './project-dashboard-tabs/project-dashboard-tabs.component';
import { BehaviorSubject } from 'rxjs';
import { IdbProject, getNewIdbProject } from '../models/project';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ProjectDashboardComponent', () => {
  let component: ProjectDashboardComponent;
  let fixture: ComponentFixture<ProjectDashboardComponent>;
  let projectIdbService: Partial<ProjectIdbService> = {
    selectedProject: new BehaviorSubject<IdbProject>(getNewIdbProject('', '', '', ''))
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [ProjectDashboardComponent, ProjectDashboardTabsComponent],
      providers: [{ provide: ProjectIdbService, useValue: projectIdbService }]
    });
    fixture = TestBed.createComponent(ProjectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
