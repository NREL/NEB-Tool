import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';

@Component({
  selector: 'app-assessment-settings',
  templateUrl: './assessment-settings.component.html',
  styleUrl: './assessment-settings.component.css'
})
export class AssessmentSettingsComponent {
  selectedAssessment: IdbAssessment;
  selectedAssessmentSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService) {
  }

  ngOnInit() {
    this.selectedAssessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.selectedAssessment = _assessment;
    });
  }

  ngOnDestroy() {
    this.selectedAssessmentSub.unsubscribe();
  }

 
  async saveChanges(){
    await this.assessmentIdbService.asyncUpdate(this.selectedAssessment);
  }
}
