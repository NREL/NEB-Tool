import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsFormComponent } from './project-details-form.component';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';

describe('ProjectDetailsFormComponent', () => {
  let component: ProjectDetailsFormComponent;
  let fixture: ComponentFixture<ProjectDetailsFormComponent>;

  beforeEach(() => {
    let projectIdbService: Partial<ProjectIdbService> = {
      selectedProject: new BehaviorSubject<IdbProject>(getNewIdbProject('', '', ''))
    }
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProjectDetailsFormComponent],
      providers: [
        { provide: ProjectIdbService, useValue: projectIdbService }
      ]
    });
    fixture = TestBed.createComponent(ProjectDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
