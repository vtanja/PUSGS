import { RentCar } from '../models/rent-a-car.model';
import { Injectable} from '@angular/core';
import { Car } from '../models/Car.model';
import { Subject } from 'rxjs';
import { Address } from '../models/address';
import { RateDialogComponent } from '../user/reservations/rate-dialog/rate-dialog.component';
import { UsersRate } from '../models/users-rate.model';

@Injectable()
export class  RentCarService {

  rentCars:Array<RentCar> = new Array<RentCar>();
  searchParamsSubject = new Subject<{}>();
  searchCarsParamsSubject = new Subject<{}>();
  sortChange = new Subject<string>();
  rentCarChangeSubject = new Subject<number>();

  constructor(){
    this.loadRentCars();
  }

  loadRentCars(){

    const avDates = ["15-5-2020","16-5-2020","17-5-2020","18-5-2020","19-5-2020","20-5-2020"];

    const c1 = new Car(1, 'Audi', 'Q3', 2020, 45,avDates,"../../assets/images/cars/audi-q3-car.png",5,4,true,true,'Firefly',1);
    const c2 = new Car(2, 'Citroen', 'M5', 2017, 35,avDates,"../../assets/images/cars/citroen-4.png",5,4,true,true,'Getaround',2);
    const c3 = new Car(3, 'Ford', 'XY', 1991, 25,avDates,"../../assets/images/cars/ford-10.png",7,4,false,false,'Drivy',3);
    const c4 = new Car(4, 'KIA', 'AMG', 2019, 37,avDates,"../../assets/images/cars/kia-37.png",5,4,true,true,'Drive',4);
    const c5 = new Car(5, 'Mercedes', 'YA', 2010, 56,avDates,"../../assets/images/cars/mercedes-2.png",7,4,true,true,'Solid',5);
    const c6 = new Car(6, 'Nissan', 'Y7', 2010, 46,avDates,"../../assets/images/cars/nissan57.png",5,4,true,true,'Firefly',1);
    const c7 = new Car(7, 'Nissan', 'X9', 2010, 48,avDates,"../../assets/images/cars/nissan-19.png",5,4,true,true,'Getaround',2);
    const c8 = new Car(8, 'Renault', 'R1', 2010, 26,avDates,"../../assets/images/cars/renault21.png",5,4,true,true,'Drivy',3);
    const c9 = new Car(9, 'Renault', 'R2', 2010, 36,avDates,"../../assets/images/cars/renault24.png",5,4,true,true,'Drive',4);
    const c10 = new Car(10, 'Renault', 'R3', 2010, 42,avDates,"../../assets/images/cars/renault30.png",5,4,true,true,'Solid',5);



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


    const addr1 = new Address(3,"Trg Republike","Belgrade","Serbia",20.4600548,44.8158535);
    const addr2 = new Address(20,"Toplice Milana","Novi Sad","Serbia",19.8316050,45.2533910);
    const addr3 = new Address(7,"27. marta","Kragujevac","Serbia",20.9149254,44.0103475);
    const addr4 = new Address(80,"Dusanova","Nis","Serbia",21.9023315,43.3167235);
    const addr5 = new Address(15,"Hercegovacka","Podgorica","Montenegro",19.2619547,42.4431359);
    const addr6 = new Address(6,"Brodarska","Budva","Montenegro",18.8495162,-42.2887696);
    const addr7 = new Address(11,"Ivana Mykolaichuka St","Kiev","Ukraine",30.6014401,50.4328640);
    const addr8 = new Address(10,"Orange St","London","United Kingdom",-0.1333887,51.509152);
    const addr9 = new Address(26,"Weaman St","Birmingham","United Kingdom",-1.8974304,52.4843609);
    const addr10 = new Address(130,"Duke St","Liverpool","United Kingdom",-2.9788103,53.4005398);
    const addr11 = new Address(7,"Nikole Tesle","Dubrovnik","Croatia",18.0859337,42.6528545);
    const addr12 = new Address(4,"Hercegovacka ul.","Split","Croatia",16.4517963,43.5195131);
    const addr13 = new Address(39,"Hebrangova ul.","Zagreb","Croatia",15.9711975,45.8088368);
    const addr14 = new Address(42,"Splitska ul","Zadar","Croatia",15.2451547,44.1191606);
    const addr15 = new Address(22,"Ul. Svete Ane","Osijek","Croatia",18.6719137,45.5599917);
    const addr16 = new Address(12,"Serleg u.","Budapest","Hungary",19.037678,47.4819775);
    const addr17 = new Address(4,"Svetosavska","Trebinje","Bosnia and Herzegovina",18.3452457,42.7078162);
    const addr18 = new Address(46,"Vase Pelagica","Banja Luka","Bosnia and Herzegovina",17.1965471,44.7724927);
    const addr19 = new Address(21,"Kralja Tvrtka","Mostar","Bosnia and Herzegovina",17.8042078,43.3459761);

    const offices = {'Serbia': [addr1,addr2,addr3,addr4],
    'Montenegro':[addr5,addr6],
    'Ukraine':[addr7],
    'United Kingdom':[addr8,addr9,addr10],
    'Croatia':[addr11,addr12,addr13,addr14,addr15],
    'Hungary':[addr16],
    'Bosnia and Herzegovina' : [addr17,addr18,addr19]};

    const rc1 = new RentCar(1,"Firefly",new Address(10,"Jevrejska", "Novi Sad", "Serbia",19.8412788,45.2537165),description1,[c1,c6],offices,"../../assets/images/rentCarLogos/logo1.png");
    const rc2 = new RentCar(2,"Getaround",new Address(1,"Kneza Mihaila", "Belgrade", "Serbia",20.4576212,44.8148958),description2,[c2,c7],offices,"../../assets/images/rentCarLogos/logo2.png");
    const rc3 = new RentCar(3,"Drivy",new Address(9,"Republike Srpske","Trebinje","BIH",18.3485342,42.7080396),description3,[c3,c8],offices,"../../assets/images/rentCarLogos/logo3.png");
    const rc4 = new RentCar(4,"Drive",new Address(34,"Vaci utca", "Budapest","Hungary",19.0514877,47.4928031),description4,[c4,c9],offices,"../../assets/images/rentCarLogos/logo4.png");
    const rc5 = new RentCar(5,"Solid",new Address(10,"Kneza Branimira", "Dubrovnik","Croatia",18.0875331,42.6500704),description5,[c5,c10],offices,"../../assets/images/rentCarLogos/logo6.png");

    this.rentCars.push(rc1);
    this.rentCars.push(rc2);
    this.rentCars.push(rc3);
    this.rentCars.push(rc4);
    this.rentCars.push(rc5);

    this.addCarRate(1,1,new UsersRate(1,"Andjela",1));
    this.addCarRate(1,1,new UsersRate(5,"Andjela",1));
    this.addCarRate(1,1,new UsersRate(2,"Andjela",1));

  }

  getCarsAtLocation(location:string) : Car[]{
    var result:Car[]=[];
    var places:any[] = location.split(',');
    console.log(places);
    for(let rentCar of this.rentCars){
      {
        var cars = rentCar.cars;
        if(rentCar.offices[places[1].trim()]!==undefined){
          var offices:string[] = rentCar.offices[places[1].trim()];
          console.log(undefined);
          if(offices!==undefined){
            if(offices.indexOf(places[0].trim())!==-1){
              result.push(...cars);

             }
          }


        }
      }

    }
    return result;
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

  getCar(companyID:number,carID:number){
   return this.rentCars.find(c=>c.id===companyID).cars.find(c=>c.id===carID);
  }

  getCarFromId(id:number){
    for(let company of this.rentCars){
      let car = company.cars.find(c=>c.id===id);
      if(car !== undefined){
        console.log(car);
        return company.cars.find(c=>c.id===id);
      }
    }
  }

  getCompanyCars(companyID:number){
    return this.rentCars.find(c=>c.id==companyID).cars;
  }

  getCompanyCar(companyID:number,carID:number){
    return this.rentCars.find(company=>company.id===companyID).cars.find(c=>c.id===carID);
  }


  deleteCar(carID:number){

    this.rentCars.find(c=>c.id===carID);

  }

  addCarRate(companyID:number,carID:number,carRate:UsersRate){
    this.rentCars.find(r=>r.id===companyID).cars.find(c=>c.id===carID).addRate(carRate);
  }

  addCompanyRate(companyID:number,rate:UsersRate){
    this.rentCars.find(r=>r.id===companyID).addRate(rate);
  }

}
