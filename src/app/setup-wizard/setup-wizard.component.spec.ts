import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardComponent } from './setup-wizard.component';
import { SetupWizardTabsComponent } from './setup-wizard-tabs/setup-wizard-tabs.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SetupWizardComponent', () => {
  let component: SetupWizardComponent;
  let fixture: ComponentFixture<SetupWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SetupWizardTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
