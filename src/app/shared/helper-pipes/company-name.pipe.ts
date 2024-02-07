import { Pipe, PipeTransform } from '@angular/core';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Pipe({
  name: 'companyName'
})
export class CompanyNamePipe implements PipeTransform {

  constructor(private companyIdbService: CompanyIdbService) {
  }

  transform(companyGUID: string): string {
    let company: IdbCompany = this.companyIdbService.getByGUID(companyGUID);
    if (company) {
      return company.name;
    }
    return '';
  }

}
