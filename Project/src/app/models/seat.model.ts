export class Seat{
    code:string;
    flightId:number;

    constructor(code:string, flightId:number){
        this.code = code;
        this.flightId = flightId;
    }
}