import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { RentCarService } from '../../../../services/rent-a-car.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  cars:Array<Car> = new Array<Car>();
  params:{};
  daysBetween:number;
  isSpining:boolean ;

  constructor(private activeRoute:ActivatedRoute,
              private carService:CarService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe((queryParams:Params)=>{
      this.params=queryParams;
      this.daysBetween = this.getDaysBetween(queryParams.pickUpDate,queryParams.dropOffDate);

      let params =
        "pickUpLocation=" + queryParams.pickUpLocation +
        "&dropOffLocation=" + queryParams.dropOffLocation +
        "&pickUpDate=" + queryParams.pickUpDate +
        "&dropOffDate=" + queryParams.dropOffDate +
        "&passsengers=" + queryParams.passsengers +
        "&brand=" + queryParams.carBrand;
        ;

      this.showSpinner();
      this.carService.searchCars(params).subscribe(
        res=>{
          this.cars = res;
          this.hideSpinner();
        },
        err=>{
          this.hideSpinner();
        }
      );
      });
}

getDaysBetween(start:string,end:string):number{

  const ONE_DAY = 1000 * 60 * 60 * 24;

  var startParts = start.split('-');
  var endParts = end.split('-');

  var date1 = new Date(+startParts[2],+startParts[1]-1,+startParts[0]);
  var date2 = new Date(+endParts[2],+endParts[1]-1,+endParts[0]);

  const diffDays = Math.round(Math.abs((+date1 - +date2) / ONE_DAY));
  return diffDays;
}

showSpinner(){
  this.isSpining = true;
  this.spinner.show();
}

hideSpinner(){
  this.spinner.hide();
  this.isSpining = false;
}
}
