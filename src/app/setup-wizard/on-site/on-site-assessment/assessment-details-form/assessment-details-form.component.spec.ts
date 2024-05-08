import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsFormComponent } from './assessment-details-form.component';

describe('AssessmentDetailsFormComponent', () => {
  let component: AssessmentDetailsFormComponent;
  let fixture: ComponentFixture<AssessmentDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
