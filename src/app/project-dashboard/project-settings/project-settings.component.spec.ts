import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsComponent } from './project-settings.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { BehaviorSubject } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { FormsModule } from '@angular/forms';

describe('ProjectSettingsComponent', () => {
  let component: ProjectSettingsComponent;
  let fixture: ComponentFixture<ProjectSettingsComponent>;

  let projectIdbService: Partial<ProjectIdbService> = {
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    selectedProject: new BehaviorSubject<IdbProject>(getNewIdbProject('', '', '', ''))
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [ProjectSettingsComponent, ManageProjectComponent],
      providers: [
        { provide: ProjectIdbService, useValue: projectIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: DbChangesService, useValue: {}}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
