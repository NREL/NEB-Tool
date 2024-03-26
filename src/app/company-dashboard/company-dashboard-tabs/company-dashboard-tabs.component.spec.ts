import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardTabsComponent } from './company-dashboard-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompanyDashboardTabsComponent', () => {
  let component: CompanyDashboardTabsComponent;
  let fixture: ComponentFixture<CompanyDashboardTabsComponent>;

  beforeEach(async () => {
    let companyIdbService: Partial<CompanyIdbService> = {
      selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
    };
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [CompanyDashboardTabsComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
