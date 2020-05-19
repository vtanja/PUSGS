export class Plane {
    id:number;
    name:string;
    booked:string[];
    premiumSeats:string[];
    segments:{name:string, value:{rows:number, columns:number}}[];

    constructor(name:string){
        this.id=-1;
        this.name=name;
        this.booked=[];
        this.premiumSeats=[];
        this.segments=[];
    }
}
