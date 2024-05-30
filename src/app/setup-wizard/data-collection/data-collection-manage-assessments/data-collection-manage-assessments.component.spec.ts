import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectionManageAssessmentsComponent } from './data-collection-manage-assessments.component';

describe('DataCollectionManageAssessmentsComponent', () => {
  let component: DataCollectionManageAssessmentsComponent;
  let fixture: ComponentFixture<DataCollectionManageAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataCollectionManageAssessmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataCollectionManageAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
