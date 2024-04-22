import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProcessEquipmentSetupComponent } from './facility-process-equipment-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FacilityProcessEquipmentSetupComponent', () => {
  let component: FacilityProcessEquipmentSetupComponent;
  let fixture: ComponentFixture<FacilityProcessEquipmentSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
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
