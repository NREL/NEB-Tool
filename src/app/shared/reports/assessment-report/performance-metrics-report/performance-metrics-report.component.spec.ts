import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsReportComponent } from './performance-metrics-report.component';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { AssessmentReport, getAssessmentReport } from '../../calculations/assessmentReport';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('PerformanceMetricsReportComponent', () => {
  let component: PerformanceMetricsReportComponent;
  let fixture: ComponentFixture<PerformanceMetricsReportComponent>;

  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntriesModule],
      declarations: [PerformanceMetricsReportComponent],
      providers: [
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceMetricsReportComponent);
    component = fixture.componentInstance;
    let assessment: IdbAssessment = getNewIdbAssessment('', '', '');
    let assessmentReport: AssessmentReport = getAssessmentReport(assessment, [], [], []);
    component.keyPerformanceIndicatorReport = assessmentReport.keyPerformanceIndicatorReport;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
