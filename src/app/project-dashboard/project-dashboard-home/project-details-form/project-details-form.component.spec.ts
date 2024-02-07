import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsFormComponent } from './project-details-form.component';

describe('ProjectDetailsFormComponent', () => {
  let component: ProjectDetailsFormComponent;
  let fixture: ComponentFixture<ProjectDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsFormComponent]
    });
    fixture = TestBed.createComponent(ProjectDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
