import { Component } from '@angular/core';
import { IconDefinition, faBuilding, faChevronDown, faChevronRight, faCircleInfo, faFileLines, faFolder, faFolderOpen, faInbox, faIndustry, faMinusSquare, faPlusSquare, faQuestionCircle, faTrophy, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  faMinusSquare: IconDefinition = faMinusSquare;
  faPlusSquare: IconDefinition = faPlusSquare;
  faFolder: IconDefinition = faFolder;
  faFolderOpen: IconDefinition = faFolderOpen;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;
  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faFileLines: IconDefinition = faFileLines;
  faTrophy: IconDefinition = faTrophy;
  faCircleInfo: IconDefinition = faCircleInfo;
  faInbox: IconDefinition = faInbox;
  faQuestionCircle: IconDefinition = faQuestionCircle;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;


  sidebarOpen: boolean;
  sidebarOpenSub: Subscription;
  constructor(private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService, private projectIdbService: ProjectIdbService,
    private sharedDataService: SharedDataService) {
  }

  ngOnInit() {
    this.sidebarOpenSub = this.sharedDataService.sidebarOpen.subscribe(_sidebarOpen => {
      this.sidebarOpen = _sidebarOpen;
    })

    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });


    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });

    this.projectsSub = this.projectIdbService.projects.subscribe(_projects => {
      this.projects = _projects;
    })
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.projectsSub.unsubscribe();
    this.sidebarOpenSub.unsubscribe();
  }


  hideSidebar(){
    this.sharedDataService.sidebarOpen.next(false);
  }
}
