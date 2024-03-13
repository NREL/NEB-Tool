import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportComponent } from './project-report.component';

describe('ProjectReportComponent', () => {
  let component: ProjectReportComponent;
  let fixture: ComponentFixture<ProjectReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
