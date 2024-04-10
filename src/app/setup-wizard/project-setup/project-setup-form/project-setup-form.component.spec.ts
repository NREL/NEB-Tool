import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetupFormComponent } from './project-setup-form.component';

describe('ProjectSetupFormComponent', () => {
  let component: ProjectSetupFormComponent;
  let fixture: ComponentFixture<ProjectSetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSetupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
