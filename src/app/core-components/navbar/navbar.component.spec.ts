import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '../loading/loading.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    let userDbService: Partial<UserIdbService> = {};
    let loadingService: Partial<LoadingService> = {};
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [NavbarComponent],
      providers: [
        { provide: UserIdbService, useValue: userDbService },
        { provide: LoadingService, useValue: loadingService }
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
