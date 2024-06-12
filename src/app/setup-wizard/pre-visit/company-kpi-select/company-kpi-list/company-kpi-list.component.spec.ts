import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiListComponent } from './company-kpi-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { BehaviorSubject } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';

describe('CompanyKpiListComponent', () => {
  let component: CompanyKpiListComponent;
  let fixture: ComponentFixture<CompanyKpiListComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany('',))
  };
  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject <Array<IdbContact>>([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CompanyKpiListComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: ContactIdbService, useValue: contactIdbService }
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
