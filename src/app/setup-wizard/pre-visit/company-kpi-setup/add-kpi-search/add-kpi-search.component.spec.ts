import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKpiSearchComponent } from './add-kpi-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { KpiUnitOptionPipe } from '../kpi-unit-option.pipe';
import { KpiCategoryClassPipe } from '../kpi-category-class.pipe';
import { KpiListFilterPipe } from './kpi-list-filter.pipe';
import { FormsModule } from '@angular/forms';

describe('AddKpiSearchComponent', () => {
  let component: AddKpiSearchComponent;
  let fixture: ComponentFixture<AddKpiSearchComponent>;
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(undefined),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [AddKpiSearchComponent, KpiListFilterPipe, KpiCategoryClassPipe, KpiUnitOptionPipe],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService }
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
