import { Segment } from './segment';
import { Airline } from './airline.model';

export class Plane {
    id:number;
    code:string;
    segments:Segment[];
    booked:string[]=[];
    airlineId:number;
    airline:Airline;
    airlineName:string;

    constructor(code:string, segments:Segment[], airlineId:number){
        this.code=code;
        this.segments=segments;
        this.airlineId=airlineId;
    }
}
