import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardComponent } from './setup-wizard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SetupWizardSidebarComponent } from './setup-wizard-sidebar/setup-wizard-sidebar.component';
import { UserIdbService } from '../indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from '../models/user';
import { BehaviorSubject } from 'rxjs';

describe('SetupWizardComponent', () => {
  let component: SetupWizardComponent;
  let fixture: ComponentFixture<SetupWizardComponent>;

  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  };
  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SetupWizardSidebarComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService }
      ]
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
