import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentFormComponent } from './energy-equipment-form.component';

describe('EnergyEquipmentFormComponent', () => {
  let component: EnergyEquipmentFormComponent;
  let fixture: ComponentFixture<EnergyEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyEquipmentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
