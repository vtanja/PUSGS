import { RentCarService } from '../services/rent-a-car.service';
import { RentCar } from './rent-a-car.model';
import { Car } from './Car.model';

export class CarReservation{

  pickUpDate:string;
  pickUpTime:string;
  dropOffDate:string;
  dropOffTime:string;
  price:number;
  companyName:string;
  carModel:string;
  carBrand:string;
  companyRate:number;
  carRate:number;
  carLogo:string
  id:number;
  canRate:boolean;

  constructor(id:number,pickUpDate:string,pickUpTime:string, dropOffDate:string, dropOffTime:string, price:number, companyName:string, carModel:string,
    carBrand:string,carRate:number,companyRate:number,canRate:boolean,carLogo:string){
    this.pickUpDate=pickUpDate;
    this.pickUpTime = pickUpTime;
    this.dropOffDate=dropOffDate;
    this.dropOffTime=dropOffTime;
    this.price=price;
    this.companyName =companyName;
    this.carModel = carModel;
    this.carBrand = carBrand;
    this.carRate= carRate;
    this.companyRate= companyRate;
    this.canRate = canRate;
    this.carLogo = carLogo;
    this.id = id;
  }
}
