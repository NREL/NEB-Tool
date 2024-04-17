import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.css'
})
export class ManageProjectComponent {

  faPenToSquare: IconDefinition = faPenToSquare;
  faTrash: IconDefinition = faTrash;

  accordionOpen: boolean = false;
  project: IdbProject;
  projectSub: Subscription;
  displayDeleteModal: boolean = false;
  constructor(private projectIdbService: ProjectIdbService,
    private dbChangesService: DbChangesService, private router: Router) {
  }

  ngOnInit() {
    this.projectSub = this.projectIdbService.selectedProject.subscribe(_project => {
      this.project = _project;
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async confirmDelete() {
    await this.dbChangesService.deleteProjects([this.project]);
    this.router.navigateByUrl('/user')
  }
}
