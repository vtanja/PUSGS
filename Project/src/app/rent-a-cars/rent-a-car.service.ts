import { RentCar } from '../models/rent-a-car.model';
import { Injectable, OnInit } from '@angular/core';
import { Car } from '../models/Car.model';

@Injectable()
export class  RentCarService {

  rentCars:Array<RentCar> = new Array<RentCar>();

  constructor(){
    this.loadRentCars();
  }

  loadRentCars(){

    console.log("loadRentCars");

    const rc1 = new RentCar(1,"My RC First","Novi Sad,Serbia","We offer you wide choice of cars with favorable prices.Enjoy your travel fully.",3.5,[],[],["../../assets/images/rentcar1.jpg"]);
    const rc2 = new RentCar(2,"My RC Second","Belgrade,Serbia","Rent a car and enjoy",5,[],[],["../../assets/images/rentcar2.jpg"]);
    const rc3 = new RentCar(3,"My RC Third","Trebinje,Bosnia and Herzegovina","We offer you best cars at lowest price",2.9,[],[],["../../assets/images/rentcar3.jpg"]);
    const rc4 = new RentCar(4,"My RC Fourth","Budapest,Hungary","We offer you best quality at lowest price",4.7,[],[],["../../assets/images/rentcar4.jpg"]);
    const rc5 = new RentCar(5,"My RC Fifth","Dubrovnik,Croatia","Enjoy your stay with our cars",4.8,[],[],["../../assets/images/rentcar5.jpg"]);


    const c1 = new Car(1, 'Audi', 'RS5', 2020, 245,[],[]);
    const c2 = new Car(2, 'BMW', 'M5', 2017, 175,[],[]);
    const c3 = new Car(3, 'Yugo', 'Koral 45', 1991, 25,[],[]);
    const c4 = new Car(4, 'Mercedec', 'AMG GT63', 2019, 437,[],[]);
    const c5 = new Car(5, 'Toyota', 'Yaris', 2010, 86,[],[]);

    this.rentCars.push(rc1);
    this.rentCars.push(rc2);
    this.rentCars.push(rc3);
    this.rentCars.push(rc4);
    this.rentCars.push(rc5);

    console.log(this.rentCars);
  }

  getRentCars(){
    console.log(this.rentCars);
    return this.rentCars.slice();
  }


}
