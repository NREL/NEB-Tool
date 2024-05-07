import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailsSummaryComponent } from './team-details-summary.component';

describe('TeamDetailsSummaryComponent', () => {
  let component: TeamDetailsSummaryComponent;
  let fixture: ComponentFixture<TeamDetailsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamDetailsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
