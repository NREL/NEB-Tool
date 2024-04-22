import { Pipe, PipeTransform } from '@angular/core';
import { KPI_Category, KPI_Option, KPI_Options } from 'src/app/shared/constants/keyPerformanceIndicators';

@Pipe({
  name: 'kpiCategoryClass'
})
export class KpiCategoryClassPipe implements PipeTransform {

  transform(category: KPI_Category): string {
    if (category == 'Employee Retention') {
      return '#8E44AD';
    } else if (category == 'Sustainability') {
      return '#138D75';
    } else if (category == 'Safety') {
      return '#D35400';
    } else if (category == 'Maintenance') {
      return '#2C3E50';
    } else if (category == 'Quality') {
      return '#B7950B';
    } else if (category == 'Production') {
      return '#1F618D';
    }
    return null;
  }

}
