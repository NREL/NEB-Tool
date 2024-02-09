import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesListComponent } from './companies-list.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { RouterTestingModule } from '@angular/router/testing';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('CompaniesListComponent', () => {
  let component: CompaniesListComponent;
  let fixture: ComponentFixture<CompaniesListComponent>;

  beforeEach(() => {
    let userIdbService: Partial<UserIdbService> = {
      user: new BehaviorSubject<IdbUser>(getNewIdbUser())
    };
    let companyIdbService: Partial<CompanyIdbService> = {
      companies: new BehaviorSubject<Array<IdbCompany>>([])
    }
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HelperPipesModule],
      declarations: [CompaniesListComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: CompanyIdbService, useVale: companyIdbService }
      ]
    });
    fixture = TestBed.createComponent(CompaniesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
