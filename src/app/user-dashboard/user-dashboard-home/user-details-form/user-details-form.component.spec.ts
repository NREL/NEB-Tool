import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsFormComponent } from './user-details-form.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('UserDetailsFormComponent', () => {
  let component: UserDetailsFormComponent;
  let fixture: ComponentFixture<UserDetailsFormComponent>;

  beforeEach(() => {
    let userIdbService: Partial<UserIdbService> = {
      user: new BehaviorSubject<IdbUser>(getNewIdbUser())
    }
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UserDetailsFormComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService }
      ]
    });
    fixture = TestBed.createComponent(UserDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
