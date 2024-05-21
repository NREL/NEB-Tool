import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsFormComponent } from './assessment-details-form.component';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';

describe('AssessmentDetailsFormComponent', () => {
  let component: AssessmentDetailsFormComponent;
  let fixture: ComponentFixture<AssessmentDetailsFormComponent>;

  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', ''))
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule],
      declarations: [AssessmentDetailsFormComponent],
      providers: [
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
