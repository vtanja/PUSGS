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

    const c1 = new Car(1, 'Audi', 'Q3', 2020, 245,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/audi-q3-car.png"],5,4,true,true,'My RC First',5);
    const c2 = new Car(2, 'Citroen', 'M5', 2017, 175,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/citroen-4.png"],5,4,true,true,'My RC Second',4);
    const c3 = new Car(3, 'Ford', 'XY', 1991, 25,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/ford-10.png"],7,4,false,false,'My RC Third',3.7);
    const c4 = new Car(4, 'Kia', 'AMG', 2019, 437,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/kia-37.png"],5,4,true,true,'My RC Fourth',5);
    const c5 = new Car(5, 'Mercedes', 'YA', 2010, 86,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/mercedes-2.png"],7,4,true,true,'My RC Fifth',4.9);
    const c6 = new Car(6, 'Nissan', 'Y7', 2010, 86,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/nissan57.png"],5,4,true,true,'My RC Fifth',4.9);
    const c7 = new Car(7, 'Nissan', 'X9', 2010, 86,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/nissan-19.png"],5,4,true,true,'My RC Fifth',4.9);
    const c8 = new Car(8, 'Renault', 'R1', 2010, 86,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/renault21.png"],5,4,true,true,'My RC Fifth',4.9);
    const c9 = new Car(9, 'Renault', 'R2', 2010, 86,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/renault24.png"],5,4,true,true,'My RC Fifth',4.9);
    const c10 = new Car(10, 'Renault', 'R3', 2010, 86,["10-4-2020","11-4-2020","12-4-2020","13-4-2020","14-4-2020","15-4-2020"],["../../assets/images/cars/renault30.png"],5,4,true,true,'My RC Fifth',4.9);

    const description1 = "Welcome to Europcar, a global leader in car rental "+
    "worldwide.With over 60 years of experience in the industry, you can be sure that Europcar "+
    "has the vehicle to meet every car rental need.Make the most out of our large range of services to make car rental experience a unique experience.";

    const description2 = "Welcome to Getaround, a global leader in car rental "+
    "worldwide.With over 60 years of experience in the industry, you can be sure that Europcar "+
    "has the vehicle to meet every car rental need.Make the most out of our large range of services to make car rental experience a unique experience.";
    const description3 = "Welcome to Drivy, a global leader in car rental "+
    "worldwide.With over 60 years of experience in the industry, you can be sure that Europcar "+
    "has the vehicle to meet every car rental need.Make the most out of our large range of services to make car rental experience a unique experience.";
    const description4 = "Welcome to Drive, a global leader in car rental "+
    "worldwide.With over 60 years of experience in the industry, you can be sure that Europcar "+
    "has the vehicle to meet every car rental need.Make the most out of our large range of services to make car rental experience a unique experience.";
    const description5 = "Welcome to Solid, a global leader in car rental "+
    "worldwide.With over 60 years of experience in the industry, you can be sure that Europcar "+
    "has the vehicle to meet every car rental need.Make the most out of our large range of services to make car rental experience a unique experience.";

    const offices = {'Serbia': ["Belgrade","Novi Sad","Kragujevac","Nis"],
    'Montenegro':["Podgorica","Budva"],
    'Ukraine':["Kiev"],
    'United Kingdom':["London","Birmingham","Liverpool"],
    'Croatia':["Dubrovnik","Split","Zagreb","Zadar","Osijek"],
    'Hungary':["Budapest"],
    'BiH' : ['Trebinje','Banja Luka','Mostar']};

    const rc1 = new RentCar(1,"Firefly","Novi Sad,Serbia",description1,3.5,[c1,c6,c3,c2,c10],offices,"../../assets/images/rentCarLogos/logo1.png");
    const rc2 = new RentCar(2,"Getaround","Belgrade,Serbia",description2,5,[c2,c7,c4,c5,c9],offices,"../../assets/images/rentCarLogos/logo2.png");
    const rc3 = new RentCar(3,"Drivy","Trebinje,BiH",description3,2.9,[c3,c8,c6,c1,c4],offices,"../../assets/images/rentCarLogos/logo3.png");
    const rc4 = new RentCar(4,"Drive","Budapest,Hungary",description4,4.7,[c4,c9,c2,c8,c10],offices,"../../assets/images/rentCarLogos/logo4.png");
    const rc5 = new RentCar(5,"Solid","Dubrovnik,Croatia",description5,4.8,[c5,c10,c3,c7,c1],offices,"../../assets/images/rentCarLogos/logo6.png");

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

  getRentCarCompany(id:number){
    return this.rentCars.find(rc=>rc.id==id);
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

    for(const item of this.rentCars){
      var car;
      i=-1;

      for(const car of item.cars){
        ++i;

        if(pickUpLocation!='' && pickUpLocation!=undefined){

          var locationParts=pickUpLocation.split(','); // town,state

          if( item.offices[locationParts[1]]===undefined){
            continue;
          }else{
            if (item.offices[locationParts[1]].indexOf(locationParts[0])===-1)
            continue;
          }
        }

        if(dropOffLocation !='' && dropOffLocation!=undefined){

          var locationParts=dropOffLocation.split(','); // town,state

          if( item.offices[locationParts[1]]===undefined){
            continue;
          }else{
            if (item.offices[locationParts[1]].indexOf(locationParts[0])===-1)
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
     }
     ++j;
    }
    return resultArray;
  }


}
