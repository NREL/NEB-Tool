import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from '../setup-wizard.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbUser } from 'src/app/models/user';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-assessment-setup',
  templateUrl: './assessment-setup.component.html',
  styleUrl: './assessment-setup.component.css'
})
export class AssessmentSetupComponent {

  faFileLines: IconDefinition = faFileLines;
  assessment: IdbAssessment;
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private userIdbService: UserIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private assessmentIdbService: AssessmentIdbService) {

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
    this.assessment = this.setupWizardService.assessment.getValue();
    if (!this.assessment) {
      this.assessment = getNewIdbAssessment(newIdbFacility.userId, newIdbFacility.companyId, newIdbFacility.guid);
    }
    this.setupWizardService.assessment.next(this.assessment);

  }


  goBack() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }

  async createAssessment() {
    let company: IdbCompany = this.setupWizardService.company.getValue();
    //Add or update
    if (!company.id) {
      company = await firstValueFrom(this.companyIdbService.addWithObservable(company));
    } else {
      company = await firstValueFrom(this.companyIdbService.updateWithObservable(company));
    }
    await this.companyIdbService.setCompanies();
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    //Add or update
    if (!facility.id) {
      facility = await firstValueFrom(this.facilityIdbService.addWithObservable(facility));
    } else {
      facility = await firstValueFrom(this.facilityIdbService.updateWithObservable(facility));
    }
    await this.facilityIdbService.setFacilities();
    let assessment: IdbAssessment = this.setupWizardService.assessment.getValue();
    assessment = await firstValueFrom(this.assessmentIdbService.addWithObservable(assessment));
    await this.assessmentIdbService.setAssessments();
    this.router.navigateByUrl('/assessment/' + assessment.guid);
  }

  saveChanges() {
    this.setupWizardService.assessment.next(this.assessment);
  }
}
