import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSavingsTableComponent } from './assessment-savings-table.component';

describe('AssessmentSavingsTableComponent', () => {
  let component: AssessmentSavingsTableComponent;
  let fixture: ComponentFixture<AssessmentSavingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentSavingsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentSavingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
