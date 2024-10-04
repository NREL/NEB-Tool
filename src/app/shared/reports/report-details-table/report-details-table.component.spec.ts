import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailsTableComponent } from './report-details-table.component';

describe('ReportDetailsTableComponent', () => {
  let component: ReportDetailsTableComponent;
  let fixture: ComponentFixture<ReportDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportDetailsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
