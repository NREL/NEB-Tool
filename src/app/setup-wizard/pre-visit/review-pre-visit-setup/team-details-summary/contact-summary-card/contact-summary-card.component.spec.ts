import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSummaryCardComponent } from './contact-summary-card.component';
import { getNewIdbContact } from 'src/app/models/contact';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { BehaviorSubject } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';

describe('ContactSummaryCardComponent', () => {
  let component: ContactSummaryCardComponent;
  let fixture: ComponentFixture<ContactSummaryCardComponent>;

  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [ContactSummaryCardComponent],
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactSummaryCardComponent);
    component = fixture.componentInstance;
    component.contact = getNewIdbContact('', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
