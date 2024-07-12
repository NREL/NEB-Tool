import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollupReportComponent } from './rollup-report.component';

describe('RollupReportComponent', () => {
  let component: RollupReportComponent;
  let fixture: ComponentFixture<RollupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RollupReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RollupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
