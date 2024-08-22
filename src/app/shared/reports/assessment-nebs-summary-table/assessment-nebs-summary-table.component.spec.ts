import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsSummaryTableComponent } from './assessment-nebs-summary-table.component';

describe('AssessmentNebsSummaryTableComponent', () => {
  let component: AssessmentNebsSummaryTableComponent;
  let fixture: ComponentFixture<AssessmentNebsSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentNebsSummaryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentNebsSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
