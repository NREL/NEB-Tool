import { Pipe, PipeTransform } from '@angular/core';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Pipe({
  name: 'processEquipmentDisplay'
})
export class ProcessEquipmentDisplayPipe implements PipeTransform {

  transform(processEquipmentId: string, processEquipmentOptions: Array<IdbProcessEquipment>): string {
    let processEquipment: IdbProcessEquipment = processEquipmentOptions.find(option => {
      return option.guid == processEquipmentId;
    })
    if (processEquipment) {
      return processEquipment.equipmentName;
    }
    return null;
  }

}
