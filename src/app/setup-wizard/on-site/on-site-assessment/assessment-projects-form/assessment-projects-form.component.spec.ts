import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentProjectsFormComponent } from './assessment-projects-form.component';

describe('AssessmentProjectsFormComponent', () => {
  let component: AssessmentProjectsFormComponent;
  let fixture: ComponentFixture<AssessmentProjectsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentProjectsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentProjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
