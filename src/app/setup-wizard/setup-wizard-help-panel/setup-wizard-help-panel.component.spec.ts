import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardHelpPanelComponent } from './setup-wizard-help-panel.component';

describe('SetupWizardHelpPanelComponent', () => {
  let component: SetupWizardHelpPanelComponent;
  let fixture: ComponentFixture<SetupWizardHelpPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupWizardHelpPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupWizardHelpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
