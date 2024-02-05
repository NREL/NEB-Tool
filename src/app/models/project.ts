import { getGUID } from "../shared/helpFunctions";


export class Project {

    id?: number;
    guid: string;
    name: string;
    createdDate: Date;
    modifiedDate: Date;
    constructor(){
        this.guid = getGUID();
        this.name = '';
        this.createdDate = new Date();
        this.setModifiedDate();
    }

    setModifiedDate(){
        this.modifiedDate = new Date();
    }
}