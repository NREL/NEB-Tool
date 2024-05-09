import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsFormComponent } from './assessment-nebs-form.component';

describe('AssessmentNebsFormComponent', () => {
  let component: AssessmentNebsFormComponent;
  let fixture: ComponentFixture<AssessmentNebsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentNebsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentNebsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
