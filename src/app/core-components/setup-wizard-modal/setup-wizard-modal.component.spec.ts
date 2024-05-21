import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardModalComponent } from './setup-wizard-modal.component';

describe('SetupWizardModalComponent', () => {
  let component: SetupWizardModalComponent;
  let fixture: ComponentFixture<SetupWizardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupWizardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupWizardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
