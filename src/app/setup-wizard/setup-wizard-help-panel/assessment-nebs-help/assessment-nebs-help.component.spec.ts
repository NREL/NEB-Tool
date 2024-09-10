import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsHelpComponent } from './assessment-nebs-help.component';

describe('AssessmentNebsHelpComponent', () => {
  let component: AssessmentNebsHelpComponent;
  let fixture: ComponentFixture<AssessmentNebsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentNebsHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentNebsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
