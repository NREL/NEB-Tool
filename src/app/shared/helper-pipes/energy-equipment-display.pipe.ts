import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Pipe({
  name: 'energyEquipmentDisplay'
})
export class EnergyEquipmentDisplayPipe implements PipeTransform {

  transform(energyEquipmentId: string, energyEquipments: Array<IdbEnergyEquipment>): string {
    let energyEquipment: IdbEnergyEquipment = energyEquipments.find(option => {
      return option.guid == energyEquipmentId;
    })
    if (energyEquipment) {
      return energyEquipment.equipmentName;
    }
    return null;
  }

}
