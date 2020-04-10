export class Flight {
    id:number;
    takeOffLocation:string;
    landingLocation:string;
    takeOffDate:string;
    landingDate:string;
    takeOffTime:string;
    landingTime:string;
    duration:number;
    numberOfChangeovers:number;
    changeoverLocations:Array<string>;
    price:number;
    rate:number;
    image:string;

  constructor(id:number,takeOffLocation:string, landingLocation:string, takeOffDate:string,landingDate:string,
                takeOffTime:string,landingTime:string, duration:number, numberOfChangeovers:number,changeoverLocations:Array<string>,
                  price:number, rate:number){

    this.id = id;
    this.takeOffLocation=takeOffLocation;
    this.landingLocation=landingLocation;
    this.takeOffDate=takeOffDate;
    this.landingDate=landingDate;
    this.takeOffTime=takeOffTime;
    this.landingTime=landingTime;
    this.duration=duration;
    this.numberOfChangeovers=numberOfChangeovers;
    this.changeoverLocations=changeoverLocations;
    this.price=price;
    this.rate=rate;

  }
}
