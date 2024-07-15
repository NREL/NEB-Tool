import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactModalComponent } from './contact-modal.component';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { IdbContact } from 'src/app/models/contact';

describe('ContactModalComponent', () => {
  let component: ContactModalComponent;
  let fixture: ComponentFixture<ContactModalComponent>;

  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let setupWizardService: Partial<SetupWizardService> = {
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ContactModalComponent],
      providers: [
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
