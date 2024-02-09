import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core-components/navbar/navbar.component';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { CompanyIdbService } from './indexed-db/company-idb.service';
import { FacilityIdbService } from './indexed-db/facility-idb.service';
import { UserIdbService } from './indexed-db/user-idb.service';
import { ProjectIdbService } from './indexed-db/project-idb.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, NavbarComponent, WelcomeComponent],
      providers: [
        { provide: CompanyIdbService, useValue: {} },
        { provide: FacilityIdbService, useValue: {} },
        { provide: UserIdbService, useValue: {} },
        { provide: ProjectIdbService, useValue: {} }
      ]
    })
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
