import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAssessmentSummaryComponent } from './pre-assessment-summary.component';

describe('PreAssessmentSummaryComponent', () => {
  let component: PreAssessmentSummaryComponent;
  let fixture: ComponentFixture<PreAssessmentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreAssessmentSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreAssessmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
