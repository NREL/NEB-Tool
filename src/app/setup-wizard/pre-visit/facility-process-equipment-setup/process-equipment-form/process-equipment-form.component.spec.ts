import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentFormComponent } from './process-equipment-form.component';

describe('ProcessEquipmentFormComponent', () => {
  let component: ProcessEquipmentFormComponent;
  let fixture: ComponentFixture<ProcessEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessEquipmentFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
