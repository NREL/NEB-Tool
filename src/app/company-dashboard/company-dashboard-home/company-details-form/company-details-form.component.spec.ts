import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsFormComponent } from './company-details-form.component';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { FormsModule } from '@angular/forms';

describe('CompanyDetailsFormComponent', () => {
  let component: CompanyDetailsFormComponent;
  let fixture: ComponentFixture<CompanyDetailsFormComponent>;

  beforeEach(() => {
    let companyDbServiceStub: Partial<CompanyIdbService> = {
      companies: new BehaviorSubject<Array<IdbCompany>>([]),
      selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
    }
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CompanyDetailsFormComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyDbServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CompanyDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
