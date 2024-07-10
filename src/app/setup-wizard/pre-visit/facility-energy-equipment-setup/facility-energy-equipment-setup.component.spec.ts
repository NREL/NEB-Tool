import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityEnergyEquipmentSetupComponent } from './facility-energy-equipment-setup.component';

describe('FacilityEnergyEquipmentSetupComponent', () => {
  let component: FacilityEnergyEquipmentSetupComponent;
  let fixture: ComponentFixture<FacilityEnergyEquipmentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityEnergyEquipmentSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityEnergyEquipmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
