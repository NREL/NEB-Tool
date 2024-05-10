import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsSummaryComponent } from './company-details-summary.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbProject } from 'src/app/models/project';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('CompanyDetailsSummaryComponent', () => {
  let component: CompanyDetailsSummaryComponent;
  let fixture: ComponentFixture<CompanyDetailsSummaryComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    contacts: new BehaviorSubject<Array<IdbContact>>([]),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([getNewIdbAssessment('', '', '')]),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyDetailsSummaryComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
