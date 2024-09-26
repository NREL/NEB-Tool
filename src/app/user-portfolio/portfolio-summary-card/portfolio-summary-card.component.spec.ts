import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSummaryCardComponent } from './portfolio-summary-card.component';

describe('PortfolioSummaryCardComponent', () => {
  let component: PortfolioSummaryCardComponent;
  let fixture: ComponentFixture<PortfolioSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioSummaryCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
