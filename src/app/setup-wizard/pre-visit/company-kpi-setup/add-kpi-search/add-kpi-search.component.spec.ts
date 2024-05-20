import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKpiSearchComponent } from './add-kpi-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KpiUnitOptionPipe } from '../kpi-unit-option.pipe';
import { KpiCategoryClassPipe } from '../kpi-category-class.pipe';
import { KpiListFilterPipe } from './kpi-list-filter.pipe';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';

describe('AddKpiSearchComponent', () => {
  let component: AddKpiSearchComponent;
  let fixture: ComponentFixture<AddKpiSearchComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany('',))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [AddKpiSearchComponent, KpiListFilterPipe, KpiCategoryClassPipe, KpiUnitOptionPipe],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddKpiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
