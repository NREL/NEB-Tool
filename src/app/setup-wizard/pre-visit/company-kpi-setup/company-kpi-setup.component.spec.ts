import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiSetupComponent } from './company-kpi-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { SharedSettingsFormsModule } from 'src/app/shared/shared-settings-forms/shared-settings-forms.module';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyKpiListComponent } from '../company-kpi-select/company-kpi-list/company-kpi-list.component';
import { AddKpiSearchComponent } from './add-kpi-search/add-kpi-search.component';
import { KpiListFilterPipe } from './add-kpi-search/kpi-list-filter.pipe';
import { KpiCategoryClassPipe } from './kpi-category-class.pipe';
import { KpiUnitOptionPipe } from './kpi-unit-option.pipe';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';

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

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };
  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedSettingsFormsModule, FormsModule, HelperPipesModule],
      declarations: [CompanyKpiSetupComponent, CompanyKpiListComponent, AddKpiSearchComponent, KpiListFilterPipe, KpiCategoryClassPipe, KpiUnitOptionPipe],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },   
        { provide: FacilityIdbService, useValue: facilityIdbService },   
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },   
        { provide: ContactIdbService, useValue: contactIdbService }
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
