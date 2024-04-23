import { Pipe, PipeTransform } from '@angular/core';
import { KPI_Category, KPI_Option } from 'src/app/shared/constants/keyPerformanceIndicators';

@Pipe({
  name: 'kpiListFilter'
})
export class KpiListFilterPipe implements PipeTransform {

  transform(kpi_Options: Array<KPI_Option>, searchStr: string, category: KPI_Category): Array<KPI_Option> {
    let filteredOptions: Array<KPI_Option> = kpi_Options;
    if (category) {
      filteredOptions = filteredOptions.filter(option => {
        return option.category == category
      });
    }
    if (searchStr) {
      filteredOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(searchStr.toLowerCase());
      });
    }
    return filteredOptions;
  }

}
