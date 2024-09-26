import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestVisitsTableComponent } from './latest-visits-table.component';

describe('LatestVisitsTableComponent', () => {
  let component: LatestVisitsTableComponent;
  let fixture: ComponentFixture<LatestVisitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestVisitsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestVisitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
