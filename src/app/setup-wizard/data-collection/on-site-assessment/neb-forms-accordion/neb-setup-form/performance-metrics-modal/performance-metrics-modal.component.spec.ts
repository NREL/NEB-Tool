import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsModalComponent } from './performance-metrics-modal.component';

describe('PerformanceMetricsModalComponent', () => {
  let component: PerformanceMetricsModalComponent;
  let fixture: ComponentFixture<PerformanceMetricsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceMetricsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceMetricsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
