import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsFormComponent } from './company-contacts-form.component';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact, getNewIdbContact } from 'src/app/models/contact';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('CompanyContactsFormComponent', () => {
  let component: CompanyContactsFormComponent;
  let fixture: ComponentFixture<CompanyContactsFormComponent>;


  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([]),
    getContactByGuid: () => {
      return getNewIdbContact('', '')
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyContactsFormComponent],
      providers: [
        { provide: ContactIdbService, useValue: contactIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyContactsFormComponent);
    component = fixture.componentInstance;
    component.contactGuid = '';
    component.accordionIndex = 0;
    component.contactIndex = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
