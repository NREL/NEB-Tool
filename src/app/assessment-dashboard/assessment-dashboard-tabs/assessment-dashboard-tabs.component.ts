import { Component } from '@angular/core';
import { IconDefinition, faBuilding, faChartLine, faFileLines, faFolderOpen, faGears, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
@Component({
  selector: 'app-assessment-dashboard-tabs',
  templateUrl: './assessment-dashboard-tabs.component.html',
  styleUrl: './assessment-dashboard-tabs.component.css'
})
export class AssessmentDashboardTabsComponent {

  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faGears: IconDefinition = faGears;
  faFolderOpen: IconDefinition = faFolderOpen;
  faChartLine: IconDefinition = faChartLine;
  faFileLines: IconDefinition = faFileLines;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  constructor(private assessmentIdbService: AssessmentIdbService){
  }

  ngOnInit(){
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });
  }

  ngOnDestroy(){
    this.assessmentSub.unsubscribe();
  }
}
