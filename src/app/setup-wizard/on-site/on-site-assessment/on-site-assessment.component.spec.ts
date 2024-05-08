import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteAssessmentComponent } from './on-site-assessment.component';

describe('OnSiteAssessmentComponent', () => {
  let component: OnSiteAssessmentComponent;
  let fixture: ComponentFixture<OnSiteAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnSiteAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnSiteAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
