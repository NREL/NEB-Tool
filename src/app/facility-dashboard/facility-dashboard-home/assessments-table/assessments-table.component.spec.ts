import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsTableComponent } from './assessments-table.component';

describe('AssessmentsTableComponent', () => {
  let component: AssessmentsTableComponent;
  let fixture: ComponentFixture<AssessmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
