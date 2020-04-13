export class Address {
    streetAndNumber:string;
    city:string;
    country:string;

    constructor( streetAndNumber:string,  city:string,  country:string){
        this.streetAndNumber=streetAndNumber;
        this.city=city;
        this.country=country;
    }

    toString():string{
        return this.streetAndNumber+', '+this.city+', '+this.country;
    }
}
