import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from '../setup-wizard.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.component.html',
  styleUrl: './project-setup.component.css'
})
export class ProjectSetupComponent {

  faFileLines: IconDefinition = faFileLines;
  project: IdbProject
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private userIdbService: UserIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private projectIdbService: ProjectIdbService) {

  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let newIdbCompany: IdbCompany = this.setupWizardService.company.getValue();
    //TODO: Temporary for dev.
    if (!newIdbCompany) {
      newIdbCompany = getNewIdbCompany(user.guid);
      this.setupWizardService.company.next(newIdbCompany);
    }
    let newIdbFacility: IdbFacility = this.setupWizardService.facility.getValue();;
    if (!newIdbFacility) {
      newIdbFacility = getNewIdbFacility(newIdbCompany.userId, newIdbCompany.guid);
    }
    // this.project = this.setupWizardService.project.getValue();
    // if (!this.project) {
    //   this.project = getNewIdbProject(newIdbFacility.userId, newIdbFacility.companyId, newIdbFacility.guid);
    // }
    // this.setupWizardService.project.next(this.project);

  }


  goBack() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }

  async createProject() {
    // let company: IdbCompany = this.setupWizardService.company.getValue();
    // //Add or update
    // if (!company.id) {
    //   company = await firstValueFrom(this.companyIdbService.addWithObservable(company));
    // } else {
    //   company = await firstValueFrom(this.companyIdbService.updateWithObservable(company));
    // }
    // await this.companyIdbService.setCompanies();
    // let facility: IdbFacility = this.setupWizardService.facility.getValue();
    // //Add or update
    // if (!facility.id) {
    //   facility = await firstValueFrom(this.facilityIdbService.addWithObservable(facility));
    // } else {
    //   facility = await firstValueFrom(this.facilityIdbService.updateWithObservable(facility));
    // }
    // await this.facilityIdbService.setFacilities();
    // let project: IdbProject = this.setupWizardService.project.getValue();
    // project = await firstValueFrom(this.projectIdbService.addWithObservable(project));
    // await this.projectIdbService.setProjects();
    // this.router.navigateByUrl('/project/' + project.guid);
  }

  saveChanges() {
    // this.setupWizardService.project.next(this.project);
  }
}
