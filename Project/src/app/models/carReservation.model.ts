import { RentCarService } from '../services/rent-a-car.service';

export class CarReservation{

  startDate:string;
  pickUpTime:string;
  returnDate:string;
  returnTime:string;
  numberOfDays:number;
  price:number;
  compayName:string;
  companyId:number;
  carId:number;
  carModel:string;
  companyRate:number;
  carRate:number;
  id:number;

  constructor(startDate:string,pickUpTime:string, returnDate:string, returnTime:string, numberOfDays:number, price:number, companyId:number, companyName:string, carId:number, carModel:string){
    this.startDate=startDate;
    this.pickUpTime = pickUpTime;
    this.returnDate=returnDate;
    this.returnTime=returnTime;
    this.numberOfDays=numberOfDays;
    this.price=price;
    this.companyId=companyId;
    this.compayName =companyName;
    this.carId=carId;
    this.carModel = carModel;
    this.carRate=-1;
    this.companyRate=-1;
  }
}
