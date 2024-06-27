import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsReportComponent } from './performance-metrics-report.component';

describe('PerformanceMetricsReportComponent', () => {
  let component: PerformanceMetricsReportComponent;
  let fixture: ComponentFixture<PerformanceMetricsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceMetricsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceMetricsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
