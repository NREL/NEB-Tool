import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiSetupComponent } from './company-kpi-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { SharedSettingsFormsModule } from 'src/app/shared/shared-settings-forms/shared-settings-forms.module';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyKpiListComponent } from './company-kpi-list/company-kpi-list.component';
import { AddKpiSearchComponent } from './add-kpi-search/add-kpi-search.component';
import { KpiListFilterPipe } from './add-kpi-search/kpi-list-filter.pipe';
import { KpiCategoryClassPipe } from './kpi-category-class.pipe';
import { KpiUnitOptionPipe } from './kpi-unit-option.pipe';

describe('CompanyKpiSetupComponent', () => {
  let component: CompanyKpiSetupComponent;
  let fixture: ComponentFixture<CompanyKpiSetupComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedSettingsFormsModule, FormsModule],
      declarations: [CompanyKpiSetupComponent, CompanyKpiListComponent, AddKpiSearchComponent, KpiListFilterPipe, KpiCategoryClassPipe, KpiUnitOptionPipe],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },   
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpiSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
