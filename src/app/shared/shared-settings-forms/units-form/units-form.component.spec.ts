import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsFormComponent } from './units-form.component';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/helper-pipes.module';
import { PreAssessmentSetupService } from 'src/app/setup-wizard/pre-visit/pre-assessment-setup/pre-assessment-setup.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';

describe('UnitsFormComponent', () => {
  let component: UnitsFormComponent;
  let fixture: ComponentFixture<UnitsFormComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let setupWizardService: Partial<SetupWizardService> = {  };
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {};
  let preAassessmentSetupService: Partial<PreAssessmentSetupService> = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [UnitsFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: PreAssessmentSetupService, useValue: preAassessmentSetupService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService }
      ]
    });
    fixture = TestBed.createComponent(UnitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
