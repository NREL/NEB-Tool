import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardTabsComponent } from './assessment-dashboard-tabs.component';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';

describe('AssessmentDashboardTabsComponent', () => {
  let component: AssessmentDashboardTabsComponent;
  let fixture: ComponentFixture<AssessmentDashboardTabsComponent>;

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '', getDefaultUnitSettings()))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [AssessmentDashboardTabsComponent],
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentDashboardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
