import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetupListComponent } from './project-setup-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SetupWizardService } from '../../../setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbProject } from 'src/app/models/project';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';

describe('ProjectSetupListComponent', () => {
  let component: ProjectSetupListComponent;
  let fixture: ComponentFixture<ProjectSetupListComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(undefined),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, FormsModule],
      declarations: [ProjectSetupListComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: UserIdbService, useValue: userIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectSetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
