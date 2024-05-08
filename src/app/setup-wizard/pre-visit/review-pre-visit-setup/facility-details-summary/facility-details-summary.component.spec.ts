import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailsSummaryComponent } from './facility-details-summary.component';

describe('FacilityDetailsSummaryComponent', () => {
  let component: FacilityDetailsSummaryComponent;
  let fixture: ComponentFixture<FacilityDetailsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityDetailsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
