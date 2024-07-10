import { Pipe, PipeTransform } from '@angular/core';
import { IconDefinition, faArrowUpFromWaterPump, faBarsStaggered, faCube, faFan, faFireFlameSimple, faWind } from '@fortawesome/free-solid-svg-icons';
import { EquipmentType } from '../constants/equipmentTypes';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Pipe({
  name: 'equipmentTypeIcon'
})
export class EquipmentTypeIconPipe implements PipeTransform {

  transform(processEquipmentGuid: string, processEquipments: Array<IdbProcessEquipment>): IconDefinition {
    let processEquipment: IdbProcessEquipment = processEquipments.find(equipment => {
      return equipment.guid == processEquipmentGuid;
    });
    let equipmentType: EquipmentType = processEquipment?.equipmentType;
    if (!equipmentType) {
      return faCube;
    } else if (equipmentType == 'Compressed Air') {
      return faWind;
    } else if (equipmentType == 'Fan') {
      return faFan;
    } else if (equipmentType == 'Process Heating') {
      return faFireFlameSimple;
    } else if (equipmentType == 'Pump') {
      return faArrowUpFromWaterPump;
    } else if (equipmentType == 'Steam') {
      return faBarsStaggered;
    }
    return null;
  }

}
