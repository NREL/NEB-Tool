import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardHomeComponent } from './user-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';

describe('UserDashboardHomeComponent', () => {
  let component: UserDashboardHomeComponent;
  let fixture: ComponentFixture<UserDashboardHomeComponent>;

  beforeEach(() => {
    let userIdbService: Partial<UserIdbService> = {
      user: new BehaviorSubject<IdbUser>(getNewIdbUser())
    }
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserDashboardHomeComponent, UserDetailsFormComponent, CompaniesListComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService }
      ]
    });
    fixture = TestBed.createComponent(UserDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
