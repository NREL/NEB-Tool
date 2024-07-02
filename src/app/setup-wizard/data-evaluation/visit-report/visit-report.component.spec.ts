import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitReportComponent } from './visit-report.component';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('VisitReportComponent', () => {
  let component: VisitReportComponent;
  let fixture: ComponentFixture<VisitReportComponent>;

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [VisitReportComponent],
      providers: [
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
