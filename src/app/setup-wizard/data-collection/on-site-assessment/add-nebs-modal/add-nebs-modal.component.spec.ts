import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNebsModalComponent } from './add-nebs-modal.component';

describe('AddNebsModalComponent', () => {
  let component: AddNebsModalComponent;
  let fixture: ComponentFixture<AddNebsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNebsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNebsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
