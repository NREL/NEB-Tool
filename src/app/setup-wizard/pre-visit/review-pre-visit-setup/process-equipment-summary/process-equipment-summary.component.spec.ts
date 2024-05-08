import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentSummaryComponent } from './process-equipment-summary.component';

describe('ProcessEquipmentSummaryComponent', () => {
  let component: ProcessEquipmentSummaryComponent;
  let fixture: ComponentFixture<ProcessEquipmentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessEquipmentSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessEquipmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
