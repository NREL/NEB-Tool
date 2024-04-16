import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectComponent } from './manage-project.component';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ManageProjectComponent', () => {
  let component: ManageProjectComponent;
  let fixture: ComponentFixture<ManageProjectComponent>;

  let projectIdbService: Partial<ProjectIdbService> = {
    selectedProject: new BehaviorSubject<IdbProject>(getNewIdbProject('', '', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ManageProjectComponent],
      providers: [
        { provide: DbChangesService, useValue: {} },
        { provide: ProjectIdbService, useValue: projectIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
