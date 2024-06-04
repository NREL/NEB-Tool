import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsFormComponent } from './company-contacts-form.component';

describe('CompanyContactsFormComponent', () => {
  let component: CompanyContactsFormComponent;
  let fixture: ComponentFixture<CompanyContactsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyContactsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyContactsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
