import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberDisplay'
})
export class NumberDisplayPipe implements PipeTransform {

  transform(value: number, decimalPlaces: number = 2): string {
    if (isNaN(value)) {
      return '0';
    }
    return value.toFixed(decimalPlaces);
  }

}