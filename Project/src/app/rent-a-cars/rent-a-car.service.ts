import { RentCar } from '../models/rent-a-car.model';
import { Injectable} from '@angular/core';
import { Car } from '../models/Car.model';
import { Subject } from 'rxjs';
import { Address } from '../models/address';

@Injectable()
export class  RentCarService {

  rentCars:Array<RentCar> = new Array<RentCar>();
  searchParamsSubject = new Subject<{}>();
  searchCarsParamsSubject = new Subject<{}>();
  sortChange = new Subject<string>();

  constructor(){
    this.loadRentCars();
  }

  loadRentCars(){

    const avDates = ["15-4-2020","16-4-2020","17-4-2020","18-4-2020","19-4-2020","20-4-2020"];

    const c1 = new Car(1, 'Audi', 'Q3', 2020, 45,avDates,["../../assets/images/cars/audi-q3-car.png"],5,4,true,true,'Firefly',5.0);
    const c2 = new Car(2, 'Citroen', 'M5', 2017, 35,avDates,["../../assets/images/cars/citroen-4.png"],5,4,true,true,'Getaround',4.1);
    const c3 = new Car(3, 'Ford', 'XY', 1991, 25,avDates,["../../assets/images/cars/ford-10.png"],7,4,false,false,'Drivy',3.7);
    const c4 = new Car(4, 'KIA', 'AMG', 2019, 37,avDates,["../../assets/images/cars/kia-37.png"],5,4,true,true,'Drive',5.0);
    const c5 = new Car(5, 'Mercedes', 'YA', 2010, 56,avDates,["../../assets/images/cars/mercedes-2.png"],7,4,true,true,'Solid',4.9);
    const c6 = new Car(6, 'Nissan', 'Y7', 2010, 46,avDates,["../../assets/images/cars/nissan57.png"],5,4,true,true,'Firefly',4.9);
    const c7 = new Car(7, 'Nissan', 'X9', 2010, 48,avDates,["../../assets/images/cars/nissan-19.png"],5,4,true,true,'Getaround',4.9);
    const c8 = new Car(8, 'Renault', 'R1', 2010, 26,avDates,["../../assets/images/cars/renault21.png"],5,4,true,true,'Drivy',4.9);
    const c9 = new Car(9, 'Renault', 'R2', 2010, 36,avDates,["../../assets/images/cars/renault24.png"],5,4,true,true,'Drive',4.9);
    const c10 = new Car(10, 'Renault', 'R3', 2010, 42,avDates,["../../assets/images/cars/renault30.png"],5,4,true,true,'Solid',4.9);

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

    const rc1 = new RentCar(1,"Firefly",new Address("Jevrejska 10", "Novi Sad", "Serbia"),description1,3.5,[c1,c6],offices,"../../assets/images/rentCarLogos/logo1.png");
    const rc2 = new RentCar(2,"Getaround",new Address("Knez Mihailova 1", "Belgrade", "Serbia"),description2,5,[c2,c7],offices,"../../assets/images/rentCarLogos/logo2.png");
    const rc3 = new RentCar(3,"Drivy",new Address("Republike Srpske 9","Trebinje","BIH"),description3,2.9,[c3,c8],offices,"../../assets/images/rentCarLogos/logo3.png");
    const rc4 = new RentCar(4,"Drive",new Address("Vaci utca", "Budapest","Hungary"),description4,4.7,[c4,c9],offices,"../../assets/images/rentCarLogos/logo4.png");
    const rc5 = new RentCar(5,"Solid",new Address("Kneza Branimira 10", "Dubrovnik","Croatia"),description5,4.8,[c5,c10],offices,"../../assets/images/rentCarLogos/logo6.png");

    this.rentCars.push(rc1);
    this.rentCars.push(rc2);
    this.rentCars.push(rc3);
    this.rentCars.push(rc4);
    this.rentCars.push(rc5);

  }

  getRentCars(){
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
        var addressParts = params.address.split(',');
        var city = addressParts[0].trim();
        var country = addressParts[1].trim();

        if(city.toUpperCase()!=item.address.city.toUpperCase() || item.address.country.toUpperCase()!=country.toUpperCase()){
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

    if(params===undefined || params==={})
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

          if( item.offices[locationParts[1].trim()]===undefined){
            continue;
          }else{
            if (item.offices[locationParts[1].trim()].indexOf(locationParts[0].trim())===-1)
            continue;
          }
        }

        if(dropOffLocation !='' && dropOffLocation!=undefined){

          var locationParts=dropOffLocation.split(','); // town,state

          if( item.offices[locationParts[1].trim()]===undefined){
            continue;
          }else{
            if (item.offices[locationParts[1].trim()].indexOf(locationParts[0].trim())===-1)
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


        var pickUpDateParts = pickUpDate.split('-');
        var startDate = new Date(pickUpDateParts[2],pickUpDateParts[1]-1,pickUpDateParts[0]);

        var dropOffDateParts = dropOffDate.split('-');
        var endDate = new Date(dropOffDateParts[2],dropOffDateParts[1]-1,dropOffDateParts[0]);


        // seconds * minutes * hours * milliseconds = 1 day
         var dayy = 60 * 60 * 24 * 1000;
        var continueCheck = true;

        while(startDate<endDate){

          var dateString = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();

          if(car.availableDates.indexOf(dateString)===-1){
            continueCheck=false;
            break;
          }

          startDate = new Date(startDate.getTime() + dayy);
        }

        if(!continueCheck)
        continue;

        resultArray.push(this.rentCars[j].cars[i]);
     }
     ++j;
    }
    return resultArray;
  }

  getCarsSearch(params:any):Array<Car>{

    var resultArray = new Array<Car>();

    if(params===undefined)
    return resultArray;

    const pickUpLocation = params.pickUpLocation.trim();
    const dropOffLocation = params.dropOffLocation.trim();
    const pickUpDate = params.pickUpDate.trim();
    const dropOffDate = params.dropOffDate.trim();
    const passengers = +params.passengers;
    const brand = params.carBrand.trim();
    const companyID = +params.companyID;

    var i = 0;
    var j = 0;

      var company = this.rentCars.find(c=>c.id===companyID);

      for(const car of  company.cars){
        ++i;

        if(pickUpLocation!='' && pickUpLocation!=undefined){

          var locationParts=pickUpLocation.split(','); // town,state

          if( company.offices[locationParts[1].trim()]===undefined){
            continue;
          }else{
            if (company.offices[locationParts[1].trim()].indexOf(locationParts[0].trim())===-1)
            continue;
          }
        }

        if(dropOffLocation !='' && dropOffLocation!=undefined){

          var locationParts=dropOffLocation.split(','); // town,state

          if( company.offices[locationParts[1].trim()]===undefined){
            continue;
          }else{
            if (company.offices[locationParts[1].trim()].indexOf(locationParts[0].trim())===-1)
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
        resultArray.push(car);
     }

    return resultArray;

  }


}
