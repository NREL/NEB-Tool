import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentReportComponent } from './assessment-report.component';

describe('AssessmentReportComponent', () => {
  let component: AssessmentReportComponent;
  let fixture: ComponentFixture<AssessmentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
