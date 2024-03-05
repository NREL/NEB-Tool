import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardComponent } from './company-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyIdbService } from '../indexed-db/company-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from '../models/company';

describe('CompanyDashboardComponent', () => {
  let component: CompanyDashboardComponent;
  let fixture: ComponentFixture<CompanyDashboardComponent>;

  beforeEach(() => {
    let companyDbServiceStub: Partial<CompanyIdbService> = {
      companies: new BehaviorSubject<Array<IdbCompany>>([]),
      selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
    }
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CompanyDashboardComponent],
      providers: [{ provide: CompanyIdbService, useValue: companyDbServiceStub }],
    });
    fixture = TestBed.createComponent(CompanyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
