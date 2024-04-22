import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAssessmentSetupComponent } from './pre-assessment-setup.component';

describe('PreAssessmentSetupComponent', () => {
  let component: PreAssessmentSetupComponent;
  let fixture: ComponentFixture<PreAssessmentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreAssessmentSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreAssessmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
