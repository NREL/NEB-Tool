import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsTableComponent } from './performance-metrics-table.component';

describe('PerformanceMetricsTableComponent', () => {
  let component: PerformanceMetricsTableComponent;
  let fixture: ComponentFixture<PerformanceMetricsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceMetricsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceMetricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
