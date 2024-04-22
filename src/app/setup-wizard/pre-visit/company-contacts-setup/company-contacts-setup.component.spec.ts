import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsSetupComponent } from './company-contacts-setup.component';

describe('CompanyContactsSetupComponent', () => {
  let component: CompanyContactsSetupComponent;
  let fixture: ComponentFixture<CompanyContactsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
