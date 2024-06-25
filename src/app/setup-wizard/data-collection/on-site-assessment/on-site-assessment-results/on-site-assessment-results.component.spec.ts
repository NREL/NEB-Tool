import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteAssessmentResultsComponent } from './on-site-assessment-results.component';

describe('OnSiteAssessmentResultsComponent', () => {
  let component: OnSiteAssessmentResultsComponent;
  let fixture: ComponentFixture<OnSiteAssessmentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnSiteAssessmentResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnSiteAssessmentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
