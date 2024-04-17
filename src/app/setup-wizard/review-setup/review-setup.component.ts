import { Component } from '@angular/core';
import { IconDefinition, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { SetupWizardService } from '../setup-wizard.service';
import { IdbUser } from 'src/app/models/user';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { Router } from '@angular/router';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';

@Component({
  selector: 'app-review-setup',
  templateUrl: './review-setup.component.html',
  styleUrl: './review-setup.component.css'
})
export class ReviewSetupComponent {

  faMagnifyingGlassChart: IconDefinition = faMagnifyingGlassChart;

  company: IdbCompany;
  facility: IdbFacility;
  assessment: IdbAssessment;
  projects: Array<IdbProject>;
  constructor(private setupWizardService: SetupWizardService,
    private userIdbService: UserIdbService,
    private router: Router,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private projectIdbService: ProjectIdbService,
    private loadingService: LoadingService
  ) {

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
      this.setupWizardService.facility.next(newIdbFacility);
    }
    let newAssessment: IdbAssessment = this.setupWizardService.assessment.getValue();
    if (!newAssessment) {
      newAssessment = getNewIdbAssessment(newIdbFacility.userId, newIdbFacility.companyId, newIdbFacility.guid);
      this.setupWizardService.assessment.next(newAssessment);
    }
    //--
    this.company = this.setupWizardService.company.getValue();
    this.facility = this.setupWizardService.facility.getValue();
    this.assessment = this.setupWizardService.assessment.getValue();
    this.projects = this.setupWizardService.projects.getValue();
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/project-setup/projects')
  }

  async submit() {
    this.loadingService.setLoadingMessage("Adding content...");
    this.loadingService.setLoadingStatus(true);
    if (!this.company.id) {
      //no id = new Add
      await firstValueFrom(this.companyIdbService.addWithObservable(this.company));
    } else {
      await firstValueFrom(this.companyIdbService.updateWithObservable(this.company));
    }
    await this.companyIdbService.setCompanies();

    if (!this.facility.id) {
      //no id = new Add
      await firstValueFrom(this.facilityIdbService.addWithObservable(this.facility));
    } else {
      await firstValueFrom(this.facilityIdbService.updateWithObservable(this.facility));
    }
    await this.facilityIdbService.setFacilities();

    if (!this.assessment.id) {
      //no id = new Add
      await firstValueFrom(this.assessmentIdbService.addWithObservable(this.assessment));
    } else {
      await firstValueFrom(this.assessmentIdbService.updateWithObservable(this.assessment));
    }
    await this.assessmentIdbService.setAssessments();

    for (let i = 0; i < this.projects.length; i++) {
      if (!this.projects[i].id) {
        //no id = new Add
        await firstValueFrom(this.projectIdbService.addWithObservable(this.projects[i]));
      } else {
        await firstValueFrom(this.projectIdbService.updateWithObservable(this.projects[i]));
      }
    }
    await this.projectIdbService.setProjects();


    this.loadingService.setLoadingStatus(false);
    this.router.navigateByUrl('/assessment/' + this.assessment.guid);
  }
}
