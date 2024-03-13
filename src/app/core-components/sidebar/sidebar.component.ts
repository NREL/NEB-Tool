import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IconDefinition, faBuilding, faChevronDown, faChevronRight, faFileLines, faFolder, faFolderOpen, faIndustry, faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
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

  open: boolean = true;
  // hideSidebar: boolean;
  myProjectsOpen: boolean = true;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;


  sidebarOpen: boolean;
  sidebarOpenSub: Subscription;
  constructor(private router: Router, private userIdbService: UserIdbService, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService, private projectIdbService: ProjectIdbService,
    private sharedDataService: SharedDataService) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.setShowSidebar();
    //   }
    // });
  }

  ngOnInit() {
    this.sidebarOpenSub = this.sharedDataService.sidebarOpen.subscribe(_sidebarOpen => {
      this.sidebarOpen = _sidebarOpen;
    })


    // this.setShowSidebar();

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

  toggleSidebar() {
    this.open = !this.open;
    // setTimeout(() => {
    //   //used to trigger responsive graph resizing
    //   window.dispatchEvent(new Event("resize"));
    // }, 100)
    // this.localStorageService.store('sidebarOpen', this.open);
    // this.sharedDataService.sidebarOpen.next(this.open);
  }


  // setShowSidebar() {
  //   this.hideSidebar = (this.router.url.includes('setup-wizard') || this.router.url.includes('welcome'));
  // }


  toggleMyProjects() {
    this.myProjectsOpen = !this.myProjectsOpen;
  }

  async toggleShowFacilities(company: IdbCompany) {
    company.displayFacilities = !company.displayFacilities;
    await this.companyIdbService.asyncUpdate(company);
  }

  async toggleShowProjects(facility: IdbFacility) {
    facility.displayProjects = !facility.displayProjects;
    await this.facilityIdbService.asyncUpdate(facility);
  }

  hideSidebar(){
    this.sharedDataService.sidebarOpen.next(false);
  }
}
