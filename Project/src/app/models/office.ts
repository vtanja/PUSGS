export class Office {

  officeId:number;
  street:string;
  num:number;
  city:string;
  country:string;
  longitude:number;
  latitude:number;

  constructor(id:number,num:number, street:string,  city:string,  country:string,lon:number,lat:number){

      this.officeId = id;
      this.num = num;
      this.street=street;
      this.city=city;
      this.country=country;
      this.longitude = lon;
      this.latitude=lat;
  }

  toShortString():string{
    return this.street+ " " + this.num + ", " + this.city;
  }
}
