import { Segment } from './segment';

export class Plane {
    id:number;
    code:string;
    segments:Segment[];
    booked:string[]=[];
    airlineId:number;

    constructor(code:string, segments:Segment[], airlineId:number){
        this.code=code;
        this.segments=segments;
        this.airlineId=airlineId;
    }
}
