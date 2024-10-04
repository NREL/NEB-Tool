import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteVisitReportComponent } from './on-site-visit-report.component';

describe('OnSiteVisitReportComponent', () => {
  let component: OnSiteVisitReportComponent;
  let fixture: ComponentFixture<OnSiteVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnSiteVisitReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnSiteVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
