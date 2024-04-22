import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsSetupComponent } from './company-contacts-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('CompanyContactsSetupComponent', () => {
  let component: CompanyContactsSetupComponent;
  let fixture: ComponentFixture<CompanyContactsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CompanyContactsSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyContactsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
