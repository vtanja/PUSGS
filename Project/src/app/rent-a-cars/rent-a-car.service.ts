import { RentCar } from '../models/rent-a-car.model';
import { Injectable} from '@angular/core';
import { Car } from '../models/Car.model';
import { Subject } from 'rxjs';

@Injectable()
export class  RentCarService {

  rentCars:Array<RentCar> = new Array<RentCar>();
  searchParamsSubject = new Subject<{}>();

  constructor(){
    this.loadRentCars();
  }

  loadRentCars(){

    const c1 = new Car(1, 'Audi', 'RS5', 2020, 245,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/car1.jpg"],5,4,true,true,'My RC First',5);
    const c2 = new Car(2, 'BMW', 'M5', 2017, 175,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/car2.jpg"],5,4,true,true,'My RC Second',4);
    const c3 = new Car(3, 'Yugo', 'Koral 45', 1991, 25,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/car3.jpg"],5,2,false,false,'My RC Third',3.7);
    const c4 = new Car(4, 'Mercedec', 'AMG GT63', 2019, 437,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/car4.jpg"],5,4,true,true,'My RC Fourth',5);
    const c5 = new Car(5, 'Toyota', 'Yaris', 2010, 86,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/car5.jpg"],5,4,true,true,'My RC Fifth',4.9);

    const rc1 = new RentCar(1,"My RC First","Novi Sad,Serbia","We offer you wide choice of cars with favorable prices.Enjoy your travel fully.",3.5,[c1],["Novi Sad,Serbia"],["../../assets/images/rentcar1.jpg"]);
    const rc2 = new RentCar(2,"My RC Second","Belgrade,Serbia","Rent a car and enjoy",5,[c2],["Belgrade,Serbia"],["../../assets/images/rentcar2.jpg"]);
    const rc3 = new RentCar(3,"My RC Third","Trebinje,Bosnia and Herzegovina","We offer you best cars at lowest price",2.9,[c3],["Trebinje,Bosnia and Herzegovina"],["../../assets/images/rentcar3.jpg"]);
    const rc4 = new RentCar(4,"My RC Fourth","Budapest,Hungary","We offer you best quality at lowest price",4.7,[c4],["Budapest,Hungary"],["../../assets/images/rentcar4.jpg"]);
    const rc5 = new RentCar(5,"My RC Fifth","Dubrovnik,Croatia","Enjoy your stay with our cars",4.8,[c5],["Dubrovnik,Croatia"],["../../assets/images/rentcar5.jpg"]);

    this.rentCars.push(rc1);
    this.rentCars.push(rc2);
    this.rentCars.push(rc3);
    this.rentCars.push(rc4);
    this.rentCars.push(rc5);

  }

  getRentCars(){
    console.log(this.rentCars);
    return this.rentCars.slice();
  }

  search(params:any){

    if(params===undefined)
    return this.rentCars;

    const resultArray =[];

    for(const item of this.rentCars){

      if(params.name!='' && params.name!=undefined ){
        if(params.name.toUpperCase()!=item.name.toUpperCase()){
          continue;
        }
      }

      if(params.address!='' && params.address!=undefined ){
        if(params.address.toUpperCase()!=item.address.toUpperCase()){
          continue;
        }
      }

      if(params.rate!=undefined  && params.rate!=NaN){
        if(item.rate<params.rate){
          continue;
        }
      }

      resultArray.push(item);
    }

    return resultArray;
  }

  getCars(params:any):Array<Car>{

     var resultArray = new Array<Car>();

    if(params===undefined)
    return resultArray;

    const pickUpLocation = params.pickUpLocation.trim();
    const dropOffLocation = params.dropOffLocation.trim();
    const pickUpDate = params.pickUpDate.trim();
    const dropOffDate = params.dropOffDate.trim();
    const passengers = +params.passengers;
    const brand = params.carBrand.trim();

    var i = 0;
    var j = 0;

    console.log(pickUpDate);
    console.log(dropOffDate);

    console.log(this.rentCars[0].cars[0].availableDates);

    for(const item of this.rentCars){
      var car;
      i=0;
      for(const car of item.cars){

        if(pickUpLocation!='' && pickUpLocation!=undefined){
          if( item.offices.indexOf(pickUpLocation)===-1){
            continue;
          }
        }

        if(dropOffLocation !='' && dropOffLocation!=undefined){
          if( item.offices.indexOf(dropOffLocation)===-1){
            continue;
          }
        }

        if(pickUpDate !='' && pickUpDate!=undefined){
          if(car.availableDates.indexOf(pickUpDate)===-1){
              continue;
          }
        }

        if(dropOffDate !='' && dropOffDate!=undefined){
          if(car.availableDates.indexOf(dropOffDate)===-1){
              continue;
          }
        }

        if(brand !='' && brand!=undefined){
          if(car.brand!=brand){
              continue;
          }
        }

        if(passengers !=NaN && passengers!=undefined){
          if(car.maxPassengers<passengers){
              continue;
          }
        }
        resultArray.push(this.rentCars[j].cars[i]);
        ++i;
     }
     ++j;
    }
    console.log(resultArray);
    return resultArray;
  }


}
