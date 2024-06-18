import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricImpactFormComponent } from './performance-metric-impact-form.component';

describe('PerformanceMetricImpactFormComponent', () => {
  let component: PerformanceMetricImpactFormComponent;
  let fixture: ComponentFixture<PerformanceMetricImpactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceMetricImpactFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceMetricImpactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
