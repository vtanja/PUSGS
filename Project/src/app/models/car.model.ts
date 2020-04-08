export class Car{

  id:number;
  brand:string;
  model:string;
  year:number;
  pricePerDay:number;
  availableDates:Array<string>;
  pictures: Array<string>;

  constructor(id:number,brand:string,model:string,year:number,pricePerDay:number,avDates:Array<string>,pictures:Array<string>){

    this.id=id;
    this.brand=brand;
    this.model=model;
    this.year=year;
    this.pricePerDay = pricePerDay;
    this.availableDates = avDates;
    this.pictures = pictures;
  }
}
