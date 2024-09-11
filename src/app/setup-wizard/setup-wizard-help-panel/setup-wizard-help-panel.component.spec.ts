import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardHelpPanelComponent } from './setup-wizard-help-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalStorageService } from 'ngx-webstorage';

describe('SetupWizardHelpPanelComponent', () => {
  let component: SetupWizardHelpPanelComponent;
  let fixture: ComponentFixture<SetupWizardHelpPanelComponent>;
  let localStorageService: Partial<LocalStorageService> = {
    retrieve: () => { return undefined },
    store: () => { return undefined },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [SetupWizardHelpPanelComponent],
      providers: [
        { provide: LocalStorageService, useValue: localStorageService }
      ]
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
