import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardComponent } from './setup-wizard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SetupWizardSidebarComponent } from './setup-wizard-sidebar/setup-wizard-sidebar.component';

describe('SetupWizardComponent', () => {
  let component: SetupWizardComponent;
  let fixture: ComponentFixture<SetupWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SetupWizardSidebarComponent]
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
