import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardComponent } from './assessment-dashboard.component';
import { AssessmentDashboardTabsComponent } from './assessment-dashboard-tabs/assessment-dashboard-tabs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AssessmentIdbService } from '../indexed-db/assessment-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbAssessment, getNewIdbAssessment } from '../models/assessment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AssessmentDashboardComponent', () => {
  let component: AssessmentDashboardComponent;
  let fixture: ComponentFixture<AssessmentDashboardComponent>;
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', ''))
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [AssessmentDashboardComponent, AssessmentDashboardTabsComponent],
      providers:[
        {
          provide: AssessmentIdbService, useValue: assessmentIdbService
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
