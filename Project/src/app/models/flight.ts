export class Flight {
    id:number;
    takeOffDate:string;
    landingDate:string;
    takeOffTime:string;
    landingTime:string;
    duration:number;
    numberOfChangeovers:number;
    changeoverLocations:Array<string>;
    price:number;
    rate:number;

  constructor(id:number,takeOffDate:string,landingDate:string,takeOffTime:string,landingTime:string,
    duration:number, numberOfChangeovers:number,changeoverLocations:Array<string>, price:number, rate:number){

    this.id = id;
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
