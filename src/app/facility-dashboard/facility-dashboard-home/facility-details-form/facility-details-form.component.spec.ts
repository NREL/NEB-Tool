import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailsFormComponent } from './facility-details-form.component';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('FacilityDetailsFormComponent', () => {
  let component: FacilityDetailsFormComponent;
  let fixture: ComponentFixture<FacilityDetailsFormComponent>;

  beforeEach(() => {
    let facilityIdbService: Partial<FacilityIdbService> = {
      selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
    }
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [FacilityDetailsFormComponent],
      providers: [
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    });
    fixture = TestBed.createComponent(FacilityDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
