import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyComponent } from './manage-company.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { BehaviorSubject } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';

describe('ManageCompanyComponent', () => {
  let component: ManageCompanyComponent;
  let fixture: ComponentFixture<ManageCompanyComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCompanyComponent],
      imports: [FontAwesomeModule],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: DbChangesService, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
