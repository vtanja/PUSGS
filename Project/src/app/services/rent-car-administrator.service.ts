import { Injectable } from '@angular/core';
import { RentCar } from '../models/rent-a-car.model';
import { RentCarService } from './rent-a-car.service';
import { UserService } from './userService.service';
import { Car } from '../models/Car.model';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class RentCarAdministratorService{

  constructor(private rentCarService:RentCarService,private usersService:UserService,private calendar: NgbCalendar){

  }

  getCompanyId():number{
    let loggedUser = this.usersService.getLoggedUser();
    return this.rentCarService.getRentCarCompany(loggedUser.carCompany).id;
  }

  getRentCarCompany():RentCar{
    let loggedUser = this.usersService.getLoggedUser();
    return this.rentCarService.getRentCarCompany(loggedUser.carCompany);
  }

  getCars():Car[]{
    let loggedUser = this.usersService.getLoggedUser();
    return this.rentCarService.getCompanyCars(loggedUser.carCompany);
  }

  editCompanyData(companyID:number,name:string,description:string,address:string,logo:string):boolean{

    let company = this.rentCarService.getRentCarCompany(companyID);
    company.name=name;
    company.description=description;
    //this.rentCars.find(c=>c.id===companyID).address=address;
    return true;
  }

  changeCarPrice(companyID:number,carID:number,newPrice:number):boolean{
    let car = this.rentCarService.getCompanyCar(companyID,carID);
    car.pricePerDay = newPrice;
    return true;
  }

  addDiscount(companyID:number,carID:number,startDate:NgbDate,endDate:NgbDate,discount:number):boolean{
    return true;
  }

  deleteCar(carID:number,companyID:number):boolean{
    // let company = this.rentCarService.getRentCarCompany(companyID);
    // let car = company.cars.find(c=>c.id===carID);
    // if(this.canBeDeleted(car)){
    // company.cars.splice(company.cars.indexOf(car),1);
    // return true;
    // }
    return false;
  }

  canBeDeleted(car:Car):boolean{

    if(car.reservations.length>0){

      let today = this.calendar.getToday();
      car.reservations.forEach(res =>
      {
        if(this.stringToNgbDate(res.returnDate).after(today)){
          return false;
        }

      });

    }

    return true;
  }

  stringToNgbDate(date:string):NgbDate{

    let dateParts = date.split('-');

    return new NgbDate(+dateParts[2],+dateParts[1],+dateParts[0]);

  }

  addCar(newCar:Car):boolean{
    let loggedUser = this.usersService.getLoggedUser();
    let carCompany = this.rentCarService.getRentCarCompany(loggedUser.carCompany);
    newCar.companyName = carCompany.name;
    newCar.id = carCompany.cars.length+1;
    carCompany.cars.push(newCar);
    return true;
  }
}
