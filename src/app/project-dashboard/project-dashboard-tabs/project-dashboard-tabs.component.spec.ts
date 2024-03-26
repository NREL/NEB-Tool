import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardTabsComponent } from './project-dashboard-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { BehaviorSubject } from 'rxjs';

describe('ProjectDashboardTabsComponent', () => {
  let component: ProjectDashboardTabsComponent;
  let fixture: ComponentFixture<ProjectDashboardTabsComponent>;

  let projectIdbService: Partial<ProjectIdbService> = {
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    selectedProject: new BehaviorSubject<IdbProject>(getNewIdbProject('', '', ''))
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [ProjectDashboardTabsComponent],
      providers: [{ provide: ProjectIdbService, useValue: projectIdbService }]
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
