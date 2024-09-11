
import { mass } from "./definitions/mass";
import { temperature } from "./definitions/temperature";
import { volume } from "./definitions/volume";
import { pressure } from "./definitions/pressure";
import { power } from "./definitions/power";
import { energy } from "./definitions/energy";
import { length } from './definitions/length';
import * as _ from 'lodash';
import { area } from "./definitions/area";
import { time } from "./definitions/time";

export class ConvertValue {
    _measures = {
        length: length,
        mass: mass,
        volume: volume,
        temperature: temperature,
        pressure: pressure,
        power: power,
        energy: energy,
        area: area,
        time: time
    };

    origin: any;
    destination: any;
    convertedValue: number;
    hasError: boolean;
    constructor(value: number, from: string, to: string) {
        if (value != undefined) {
            this.origin = this.getUnit(from);
            this.destination = this.getUnit(to);

            if (!this.origin || !this.destination) {
                this.hasError = true;
                this.convertedValue = value;
            } else {
                this.hasError = false;
                this.convertedValue = this.convertValue(value);
            }
        }
    }

    convertValue(value: number) {
        // Don't change the value if origin and destination are the same
        if (this.origin.abbr === this.destination.abbr) {
            return value;
        }

        // You can't go from liquid to mass, for example
        if (this.destination.measure !== this.origin.measure) {
            this.hasError = true;
            return value;
        }

        /**
         * Convert from the source value to its anchor inside the system
         */
        let result: number = value * this.origin.unit.to_anchor;

        /**
         * For some changes it's a simple shift (C to K)
         * So we'll add it when converting into the unit (later)
         * and subtract it when converting from the unit
         */
        if (this.origin.unit.anchor_shift) {
            result -= this.origin.unit.anchor_shift;
        }

        /**
         * Convert from one system to another through the anchor ratio. Some conversions
         * aren't ratio based or require more than a simple shift. We can provide a custom
         * transform here to provide the direct result
         */
        if (this.origin.system !== this.destination.system) {
            let transform = this._measures[this.origin.measure]._anchors[this.origin.system].transform;
            if (typeof transform === 'function') {
                result = transform(result);
            }
            else {
                result *= this._measures[this.origin.measure]._anchors[this.origin.system].ratio;
            }
        }

        /**
         * This shift has to be done after the system conversion business
         */
        if (this.destination.unit.anchor_shift) {
            result += this.destination.unit.anchor_shift;
        }

        /**
         * Convert to another unit inside the destination system
         */
        this.hasError = false;
        return result / this.destination.unit.to_anchor;
    }


    getUnit(abbr: string): { name: { display: string, plural: string, singular: string }, to_anchor: number } {
        var found: { name: { display: string, plural: string, singular: string }, to_anchor: number };
        for (const property in this._measures) {
            if (!found) {
                let measure = this._measures[property];
                for (const measureProp in measure as any) {
                    if (!found) {
                        let system = measure[measureProp];
                        if (system != '_anchors') {
                            for (const systemProp in system) {
                                if (!found) {
                                    if (abbr == systemProp) {
                                        found = system[systemProp];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return found;
    }
}