import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOpportunitiesHelpComponent } from './energy-opportunities-help.component';

describe('EnergyOpportunitiesHelpComponent', () => {
  let component: EnergyOpportunitiesHelpComponent;
  let fixture: ComponentFixture<EnergyOpportunitiesHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyOpportunitiesHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyOpportunitiesHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
