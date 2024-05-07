import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsSummaryComponent } from './company-details-summary.component';

describe('CompanyDetailsSummaryComponent', () => {
  let component: CompanyDetailsSummaryComponent;
  let fixture: ComponentFixture<CompanyDetailsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyDetailsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
