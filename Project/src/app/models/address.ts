export class Address {

    addressId:number;
    street:string;
    num:number;
    city:string;
    country:string;
    longitude:number;
    latitude:number;

    constructor(addressId:number,num:number, street:string,  city:string,  country:string,lon:number,lat:number){
      this.addressId = addressId;
      this.num = num;
        this.street=street;
        this.city=city;
        this.country=country;
        this.longitude = lon;
        this.latitude=lat;
    }


    toString():string{
        return  this.street+ ' ' +this.num+', '+this.city+', '+this.country;
    }

    toShortString():string{
      return  this.street+ ' ' +this.num+', '+this.city;
    }

    toCityCountryString():string{
      return this.city+', '+this.country;
    }

    setLongitude(long:number){
      this.longitude = long;
    }

    setLatitude(lat:number){
      this.latitude = lat;
    }
}
