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
    economySeats:number;
    premiumEconomySeats:number;
    businessSeats:number;
    firstClassSeats:number;
    airline:string;
    

  constructor(id:number,takeOffLocation:string, landingLocation:string, takeOffDate:string,landingDate:string,
                takeOffTime:string,landingTime:string, duration:number, numberOfChangeovers:number,changeoverLocations:Array<string>,
                  price:number, rate:number,economySeats:number, premiumEconomySeats:number,businessSeats:number,
                  firstClassSeats:number, airline:string){

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
    this.economySeats=economySeats;
    this.premiumEconomySeats=premiumEconomySeats;
    this.businessSeats=businessSeats;
    this.firstClassSeats=firstClassSeats;
    this.airline=airline;
    
  }
}
