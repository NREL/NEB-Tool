import { Pipe, PipeTransform } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';

@Pipe({
  name: 'assessmentsList'
})
export class AssessmentsListPipe implements PipeTransform {

  transform(facilityOrCompanyGUID: string, allAssessments: Array<IdbAssessment>, isCompany?: boolean): Array<IdbAssessment> {
    if (!isCompany) {
      return allAssessments.filter(project => { return project.facilityId == facilityOrCompanyGUID });
    } else {
      return allAssessments.filter(project => { return project.companyId == facilityOrCompanyGUID });
    }
  }

}
