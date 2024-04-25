import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySetupSummaryComponent } from './company-setup-summary.component';

describe('CompanySetupSummaryComponent', () => {
  let component: CompanySetupSummaryComponent;
  let fixture: ComponentFixture<CompanySetupSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanySetupSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySetupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
