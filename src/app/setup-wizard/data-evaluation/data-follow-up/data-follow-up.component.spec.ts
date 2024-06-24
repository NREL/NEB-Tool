import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFollowUpComponent } from './data-follow-up.component';

describe('DataFollowUpComponent', () => {
  let component: DataFollowUpComponent;
  let fixture: ComponentFixture<DataFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFollowUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
