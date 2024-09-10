import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardHelpPanelComponent } from './setup-wizard-help-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('SetupWizardHelpPanelComponent', () => {
  let component: SetupWizardHelpPanelComponent;
  let fixture: ComponentFixture<SetupWizardHelpPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
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
