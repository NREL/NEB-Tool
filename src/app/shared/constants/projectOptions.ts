export interface ProjectType {
    value: string,
    label: string,
    //todo: other project tracking properties
};

export const FanProjects: Array<ProjectType> =  [
    {
        value: 'installVFD',
        label: 'Install VFD'
    },
    {
        value: 'installDriveType',
        label: 'Install More Efficient Drive Type'
    },
    {
        value: 'installEfficientFan',
        label: 'Install More Efficient Fan'
    },
    {
        value: 'installEfficientMotor',
        label: 'Install More Efficient Motor'
    },
    {
        value: 'reduceFlowRate',
        label: 'Reduce System Flow Rate'
    },
    {
        value: 'reduceSystemPressure',
        label: 'Reduce System Pressure'
    },
    {
        value: 'adjustOperationalData',
        label: 'Adjust Operational Data'
    }
];

//TODO: add projects for other energy systems.