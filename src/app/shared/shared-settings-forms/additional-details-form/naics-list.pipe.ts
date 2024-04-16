import { Pipe, PipeTransform } from '@angular/core';
import { NAICS } from '../form-data-options/naics-data';

@Pipe({
  name: 'naicsList',
  pure: false
})
export class NaicsListPipe implements PipeTransform {

  transform(list: Array<NAICS>, matchNum: string): Array<NAICS> {
    if (matchNum != undefined) {
      return list.filter(item => { return item.matchNum == matchNum });
    } else {
      return list;
    }
  }

}
