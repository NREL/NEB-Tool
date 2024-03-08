import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardTabsComponent } from './setup-wizard-tabs.component';

describe('SetupWizardTabsComponent', () => {
  let component: SetupWizardTabsComponent;
  let fixture: ComponentFixture<SetupWizardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupWizardTabsComponent]
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
