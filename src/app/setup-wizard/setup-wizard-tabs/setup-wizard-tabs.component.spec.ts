import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardTabsComponent } from './setup-wizard-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';

describe('SetupWizardTabsComponent', () => {
  let component: SetupWizardTabsComponent;
  let fixture: ComponentFixture<SetupWizardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupWizardTabsComponent],
      imports: [FontAwesomeModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupWizardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
