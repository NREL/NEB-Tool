import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetupFormComponent } from './project-setup-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';

describe('ProjectSetupFormComponent', () => {
  let component: ProjectSetupFormComponent;
  let fixture: ComponentFixture<ProjectSetupFormComponent>;


  let setupWizardService: Partial<SetupWizardService> = {
    setupContext: new BehaviorSubject<SetupWizardContext>('full'),
    sidebarOpen: new BehaviorSubject<boolean>(false),
    highlighNebGuid: new BehaviorSubject<string>(undefined),
    highlighProjectGuid: new BehaviorSubject<string>(undefined),
  };
  let projectIdbService: Partial<ProjectIdbService> = {
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    getByGuid: () => { return getNewIdbProject('', '', '', '') }
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  let dbChangesService: Partial<DbChangesService> = {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, FormsModule],
      declarations: [ProjectSetupFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: ProjectIdbService, useValue: projectIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: DbChangesService, useValue: dbChangesService },
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectSetupFormComponent);
    component = fixture.componentInstance;
    component.project = getNewIdbProject('', '', '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
