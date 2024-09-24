export const rate = {
    metric: {
        Lhr: {
            name: {
                singular: 'Liter per hour',
                plural: 'Liters per hour',
                display: '(L/hr)'
            }
            , to_anchor: 1
        }
        , m3hr: {
            name: {
                singular: 'Cubic meter per hour',
                plural: 'Cubic meters per hour',
                display: '(m&#x00B3;/hr)'
            }
            , to_anchor: 1000
        }
    },
    imperial: {
        'fl-ozhr': {
            name: {
                singular: 'Fluid Ounce per hour',
                plural: 'Fluid Ounces per hour',
                display: '(fl-oz/hr)'
            }
            , to_anchor: 1
        },
        galhr: {
            name: {
                singular: 'U.S. Gallon per hour',
                plural: 'U.S. Gallons per hour',
                display: '(gal/hr)'
            }
            , to_anchor: 128
        }
        , kgalhr: {
            name: {
                singular: 'Thousand U.S. Gallons per hour',
                plural: 'Thousands U.S. Gallons per hour',
                display: '(kgal/hr)'
            }
            , to_anchor: 128 * 1000
        }
        , ft3hr: {
            name: {
                singular: 'Cubic foot per hour',
                plural: 'Cubic feet per hour',
                display: '(ft&#x00B3;/hr)'
            }
            , to_anchor: 957.506
        }
        , SCFhr: {
            name: {
                singular: 'Standard Cubic foot per hour',
                plural: 'Standard Cubic feet per hour',
                display: '(SCF/hr)'
            }
            , to_anchor: 957.506
        }
        , CCFhr: {
            name: {
                singular: 'Hundred Cubic feet per hour'
                , plural: 'Hundreds Cubic feet per hour',
                display: 'CCF/hr'
            }
            , to_anchor: 957.506 * 100
        }
        , kSCFhr: {
            name: {
                singular: 'Thousand Standard Cubic foot per hour',
                plural: 'Thousand Standard Cubic feet per hour',
                display: '(kSCF/hr)'
            }
            , to_anchor: 957.506 * 1000
        }
        , MMCFhr: {
            name: {
                singular: 'Million Cubic foot per hour',
                plural: 'Million Cubic feet per hour',
                display: '(MMCF/hr)'
            }
            , to_anchor: 957.506 * 1000000
        }
    },
    _anchor: {
        metric: {
            unit: 'Lhr',
            ratio: 1
        },
        imperial: {
            unit: 'galhr',
            ratio: 128
        }
    }
};