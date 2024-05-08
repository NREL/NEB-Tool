import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSummaryCardComponent } from './contact-summary-card.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { IdbContact, getNewIdbContact } from 'src/app/models/contact';
import { IdbProject } from 'src/app/models/project';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('ContactSummaryCardComponent', () => {
  let component: ContactSummaryCardComponent;
  let fixture: ComponentFixture<ContactSummaryCardComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    contacts: new BehaviorSubject<Array<IdbContact>>([]),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([getNewIdbAssessment('', '', '')]),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [ContactSummaryCardComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactSummaryCardComponent);
    component = fixture.componentInstance;
    component.contact = getNewIdbContact('', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
