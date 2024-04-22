import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPreVisitSetupComponent } from './review-pre-visit-setup.component';

describe('ReviewPreVisitSetupComponent', () => {
  let component: ReviewPreVisitSetupComponent;
  let fixture: ComponentFixture<ReviewPreVisitSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewPreVisitSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewPreVisitSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
