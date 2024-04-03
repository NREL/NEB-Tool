import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssessmentComponent } from './manage-assessment.component';

describe('ManageAssessmentComponent', () => {
  let component: ManageAssessmentComponent;
  let fixture: ComponentFixture<ManageAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
