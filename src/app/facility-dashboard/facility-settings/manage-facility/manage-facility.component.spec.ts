import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFacilityComponent } from './manage-facility.component';

describe('ManageFacilityComponent', () => {
  let component: ManageFacilityComponent;
  let fixture: ComponentFixture<ManageFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFacilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
