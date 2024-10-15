import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kpiDescription',
  standalone: true
})
export class KpiDescriptionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
