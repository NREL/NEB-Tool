import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpisSummaryComponent } from './company-kpis-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { BehaviorSubject } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';

describe('CompanyKpisSummaryComponent', () => {
  let component: CompanyKpisSummaryComponent;
  let fixture: ComponentFixture<CompanyKpisSummaryComponent>;


  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyKpisSummaryComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: ContactIdbService, useValue: contactIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpisSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
