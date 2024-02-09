import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardHomeComponent } from './project-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { BehaviorSubject } from 'rxjs';
import { ProjectDetailsFormComponent } from './project-details-form/project-details-form.component';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('ProjectDashboardHomeComponent', () => {
  let component: ProjectDashboardHomeComponent;
  let fixture: ComponentFixture<ProjectDashboardHomeComponent>;

  beforeEach(() => {
    let projectIdbService: Partial<ProjectIdbService> = {
      selectedProject: new BehaviorSubject<IdbProject>(getNewIdbProject('', '', ''))
    }
    let dbChangesService: Partial<DbChangesService> = {

    }
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HelperPipesModule],
      declarations: [ProjectDashboardHomeComponent, ProjectDetailsFormComponent],
      providers: [
        { provide: ProjectIdbService, useValue: projectIdbService },
        { provide: DbChangesService, useValue: dbChangesService }
      ]
    });
    fixture = TestBed.createComponent(ProjectDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
