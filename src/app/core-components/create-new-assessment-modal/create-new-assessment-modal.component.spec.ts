import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAssessmentModalComponent } from './create-new-assessment-modal.component';

describe('CreateNewAssessmentModalComponent', () => {
  let component: CreateNewAssessmentModalComponent;
  let fixture: ComponentFixture<CreateNewAssessmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewAssessmentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewAssessmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
