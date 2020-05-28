export class Destination {
    id:number;
    city:string;
    country:string;
  
    constructor(id:number, city:string,  country:string){
  
        this.id = id;
        this.city=city;
        this.country=country;
    }
  
    // toShortString():string{
    //   return this.street+ " " + this.num + ", " + this.city;
    // }
  }
  