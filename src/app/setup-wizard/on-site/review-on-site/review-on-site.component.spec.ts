import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOnSiteComponent } from './review-on-site.component';

describe('ReviewOnSiteComponent', () => {
  let component: ReviewOnSiteComponent;
  let fixture: ComponentFixture<ReviewOnSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewOnSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewOnSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
