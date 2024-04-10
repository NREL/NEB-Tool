import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSetupComponent } from './review-setup.component';

describe('ReviewSetupComponent', () => {
  let component: ReviewSetupComponent;
  let fixture: ComponentFixture<ReviewSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
