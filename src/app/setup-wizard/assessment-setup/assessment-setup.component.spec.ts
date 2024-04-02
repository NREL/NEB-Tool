import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSetupComponent } from './assessment-setup.component';

describe('AssessmentSetupComponent', () => {
  let component: AssessmentSetupComponent;
  let fixture: ComponentFixture<AssessmentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
