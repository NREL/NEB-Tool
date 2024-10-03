import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSavingsChartComponent } from './assessment-savings-chart.component';

describe('AssessmentSavingsChartComponent', () => {
  let component: AssessmentSavingsChartComponent;
  let fixture: ComponentFixture<AssessmentSavingsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentSavingsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentSavingsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
