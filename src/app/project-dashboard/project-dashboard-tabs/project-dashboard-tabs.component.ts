import { Component } from '@angular/core';
import { IconDefinition, faBuilding, faChartLine, faFileLines, faFolderOpen, faGears, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-project-dashboard-tabs',
  templateUrl: './project-dashboard-tabs.component.html',
  styleUrl: './project-dashboard-tabs.component.css'
})
export class ProjectDashboardTabsComponent {

  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faGears: IconDefinition = faGears;
  faFolderOpen: IconDefinition = faFolderOpen;
  faChartLine: IconDefinition = faChartLine;
  faFileLines: IconDefinition = faFileLines;

  project: IdbProject;
  projectSub: Subscription;

  constructor(private projectIdbService: ProjectIdbService){
  }

  ngOnInit(){
    this.projectSub = this.projectIdbService.selectedProject.subscribe(_project => {
      this.project = _project;
    });
  }

  ngOnDestroy(){
    this.projectSub.unsubscribe();
  }
}
