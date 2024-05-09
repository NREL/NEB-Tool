import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebSetupFormComponent } from './neb-setup-form.component';

describe('NebSetupFormComponent', () => {
  let component: NebSetupFormComponent;
  let fixture: ComponentFixture<NebSetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NebSetupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NebSetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
