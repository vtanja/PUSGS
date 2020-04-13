import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { RentCarService } from '../../rent-a-car.service';

@Component({
  selector: 'app-cars-search-form',
  templateUrl: './cars-search-form.component.html',
  styleUrls: ['./cars-search-form.component.css']
})
export class CarsSearchFormComponent implements OnInit {

  times:Array<string>;
  cars:Array<string>;

  searchForm:FormGroup;

  @Input('companyID') companyID:number;

  constructor(private router:Router,private activeRoute:ActivatedRoute,private rentCarsService:RentCarService) { }

  ngOnInit(): void {

    let params = this.activeRoute.snapshot.queryParams;
    console.log(params);

    let pickUpDate;
    let dropOffDate;

    if(params['pickUpDate']!=undefined && params['dropOffDate']!=undefined){
    const partsPickUp = params['pickUpDate'].split('-');
    const year = parseInt(partsPickUp[2]);
    const month= parseInt(partsPickUp[1]);
    const day= parseInt(partsPickUp[0]);
    pickUpDate = new NgbDate(year,month,day);

    const partsDropOff = params['dropOffDate'].split('-');
    const yearDropOff = parseInt(partsDropOff[2]);
    const monthDropOff = parseInt(partsDropOff[1]);
    const dayDropOff = parseInt(partsDropOff[0]);
    dropOffDate = new NgbDate(yearDropOff,monthDropOff,dayDropOff);
    }else{
     pickUpDate="";
     dropOffDate="";
    }

    const pickUpLocation = params['pickUpLocation']!=undefined?params['pickUpLocation'] :"";
    const dropOffLocation = params['dropOffLocation']!=undefined?params['dropOffLocation'] :"";
    const pickUpTime = params['pickUpTime']!=undefined?params['pickUpTime'] :"";
    const dropOffTime = params['dropOffTime']!=undefined?params['dropOffTime'] :"";
    const carBrand = params['carBrand']!=undefined?params['carBrand'] :"";
    const passengers = params['passengers']!=undefined?params['passengers'] :"";

    this.times = new Array<string>("00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",);

    this.cars = new Array<string>("BMW","VW","Renault","Toyota","Peugeot","Citroen","Nissan","Audi","Yugo","Mercedec");

    this.searchForm = new FormGroup({

      'location' : new FormGroup({
        'pickUpLocation' : new FormControl(pickUpLocation,Validators.required),
        'dropOffLocation' : new FormControl(dropOffLocation,Validators.required)
      }),
      'dates' : new FormGroup({
        'pickUpDate': new FormControl(pickUpDate,Validators.required),
        'dropOffDate' : new FormControl(dropOffDate,Validators.required)
      }),

      'times' : new FormGroup({
        'pickUpTime': new FormControl(pickUpTime),
        'dropOffTime' : new FormControl(dropOffTime)
      }),

      'carBrand' : new FormControl(carBrand),
      'passengers' : new FormControl(passengers)

    });
  }

  onFormSubmit(){

    console.log(this.searchForm);
    const searchParams = {};

    let pickUpDate = this.searchForm.get('dates.pickUpDate').value;
    let dropOffDate = this.searchForm.get('dates.dropOffDate').value;

    searchParams['pickUpDate'] = pickUpDate.day + "-" + pickUpDate.month + "-" + pickUpDate.year;
    searchParams['dropOffDate'] = dropOffDate.day + "-" + dropOffDate.month + "-" + dropOffDate.year;
    searchParams['pickUpTime'] = this.searchForm.get('times.pickUpTime').value;
    searchParams['dropOffTime'] = this.searchForm.get('times.dropOffTime').value;
    searchParams['pickUpLocation'] = this.searchForm.get('location.pickUpLocation').value;
    searchParams['dropOffLocation'] = this.searchForm.get('location.dropOffLocation').value;
    searchParams['carBrand'] = this.searchForm.get('carBrand').value;
    searchParams['passengers'] = this.searchForm.get('passengers').value;

    if(this.companyID===undefined){
    // searchParams['companyID'] = "";

     this.router.navigate(['/allCars'],{queryParams:searchParams});
    }
    else{
      searchParams['companyID'] = this.companyID;
      this.rentCarsService.searchCarsParamsSubject.next(searchParams);

     // this.router.navigate(['carProfile',this.companyID])
    }

    console.log(searchParams);



  }

}
