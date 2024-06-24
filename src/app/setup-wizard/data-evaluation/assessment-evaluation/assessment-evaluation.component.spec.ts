import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEvaluationComponent } from './assessment-evaluation.component';

describe('AssessmentEvaluationComponent', () => {
  let component: AssessmentEvaluationComponent;
  let fixture: ComponentFixture<AssessmentEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentEvaluationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
