import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faPaw, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbAssessment } from 'src/app/models/assessment';

@Component({
  selector: 'app-manage-assessment',
  templateUrl: './manage-assessment.component.html',
  styleUrl: './manage-assessment.component.css'
})
export class ManageAssessmentComponent {

  faPaw: IconDefinition = faPaw;
  faTrash: IconDefinition = faTrash;

  accordionOpen: boolean = false;
  assessment: IdbAssessment;
  assessmentSub: Subscription;
  displayDeleteModal: boolean = false;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private dbChangesService: DbChangesService, private router: Router) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
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
    await this.dbChangesService.deleteAssessments([this.assessment]);
    this.router.navigateByUrl('/user')
  }
}
