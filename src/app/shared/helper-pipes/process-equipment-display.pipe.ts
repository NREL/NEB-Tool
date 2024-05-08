import { Pipe, PipeTransform } from '@angular/core';
import { ProcessEquipment } from '../constants/processEquipment';

@Pipe({
  name: 'processEquipmentDisplay'
})
export class ProcessEquipmentDisplayPipe implements PipeTransform {

  transform(processEquipmentId: string, processEquipmentOptions: Array<ProcessEquipment>): string {
    let processEquipment: ProcessEquipment = processEquipmentOptions.find(option => {
      return option.guid == processEquipmentId;
    })
    if (processEquipment) {
      return processEquipment.equipmentName;
    }
    return null;
  }

}
