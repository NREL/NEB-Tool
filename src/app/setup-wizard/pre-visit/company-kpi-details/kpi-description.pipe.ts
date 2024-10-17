import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Pipe({
  name: 'kpiDescription'
})
export class KpiDescriptionPipe implements PipeTransform {

  transform(kpiOptionValue: KeyPerformanceIndicatorValue): string {
    switch (kpiOptionValue) {
      case 'strategicRelationshipImpact':
        return "Strategic Relationship Impact measures the success of a business's engagement with partners and the health of those relationships. Strategic relationship impact is an intangible measurement itself but can be partially quantified using KPM to measure the success of a business's engagement with partners.  This can be done through measuring increased/losses ins sales, customer and supplier satisfaction ratings, and customer churn for example."
      case 'quality':
        return "Quality metrics are quantifiable measurements used to evaluate performance, quality, or effectiveness for a product, process or system. They are used to measure success towards a goal and drive continuous improvement.";
      case 'reduceExpenseCost':
        return "Reduce Expense Cost is a strategic process that identifies and eliminates unnecessary operational expenses to increase profitability.  The goal is always to maximize value and efficiency without compromising quality or core operations.";
      case 'safety':
        return "Safety metrics are qualitative and quantitative measurements that help organizations to monitor and improve their safety performance. They help identify areas for improvement, ensure compliance with regulations, and prevent accidents and injuries.";
      case 'waterConsumption':
        return "Water Consumption is the amount of water used by and organization.  Measuring water consumption with respect to sustainability is for the purpose to reduce consumption.";
      case 'productivity':
        return "Productivity is a quantitative measurement that assesses how efficiently a company is producing their products. Productivity metrics can be used to track performance, identify areas for improvement, maximize efficiency, and make decisions that benefit operations.";
      default:
        return "Lorem ipsum odor amet, consectetuer adipiscing elit. Ex consequat nulla vestibulum dapibus lectus vestibulum. Ex nisi phasellus tempus himenaeos erat.";
    }
  }

}
