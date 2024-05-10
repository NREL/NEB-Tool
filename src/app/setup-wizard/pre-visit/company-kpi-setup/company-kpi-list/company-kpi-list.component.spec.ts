import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiListComponent } from './company-kpi-list.component';
import { IdbProject } from 'src/app/models/project';
import { IdbFacility } from 'src/app/models/facility';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IdbContact } from 'src/app/models/contact';

describe('CompanyKpiListComponent', () => {
  let component: CompanyKpiListComponent;
  let fixture: ComponentFixture<CompanyKpiListComponent>;
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CompanyKpiListComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
