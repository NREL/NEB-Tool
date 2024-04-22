import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProcessEquipmentSetupComponent } from './facility-process-equipment-setup.component';

describe('FacilityProcessEquipmentSetupComponent', () => {
  let component: FacilityProcessEquipmentSetupComponent;
  let fixture: ComponentFixture<FacilityProcessEquipmentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityProcessEquipmentSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityProcessEquipmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
