import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFollowUpComponent } from './data-follow-up.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('DataFollowUpComponent', () => {
  let component: DataFollowUpComponent;
  let fixture: ComponentFixture<DataFollowUpComponent>;

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [DataFollowUpComponent],
      providers: [
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
