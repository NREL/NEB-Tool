import { Pipe, PipeTransform } from '@angular/core';
import { NebOption } from 'src/app/shared/constants/nonEnergyBenefitOptions';
import * as _ from 'lodash';

@Pipe({
  name: 'nebOptionsModalList'
})
export class NebOptionsModalListPipe implements PipeTransform {

  transform(options: Array<NebOption>, searchStr: string, orderByDir: 'asc' | 'desc'): Array<NebOption> {
    let filteredOptions: Array<NebOption> = options;
    if (searchStr) {
      filteredOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(searchStr.toLowerCase()) || option.selected;
      });
    }
    return _.orderBy(filteredOptions, (option: NebOption) => {
      return option.label;
    }, orderByDir);
  }

}
