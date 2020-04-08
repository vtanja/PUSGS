import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars-search',
  templateUrl: './cars-search.component.html',
  styleUrls: ['./cars-search.component.css']
})
export class CarsSearchComponent implements OnInit {

  dropOffDate: NgbDateStruct;
  pickUpDate: NgbDateStruct;

  times:Array<string>;
  cars:Array<string>;

  searchForm:FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.times = new Array<string>("00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",);

    this.cars = new Array<string>("BMW","VW","RENAULT","TOYOTA","PEUGEOT","CITROEN","NISSAN","AUDI");

    this.searchForm = new FormGroup({

      'location' : new FormGroup({
        'pickUpLocation' : new FormControl("",Validators.required),
        'dropOffLocation' : new FormControl("",Validators.required)
      }),
      'dates' : new FormGroup({
        'pickUpDate': new FormControl("",Validators.required),
        'dropOffDate' : new FormControl("",Validators.required)
      }),

      'times' : new FormGroup({
        'pickUpTime': new FormControl("",Validators.required),
        'dropOffTime' : new FormControl("",Validators.required)
      }),

      'carBrand' : new FormControl(""),
      'passengers' : new FormControl("")

    });
  }

  onFormSubmit(){
    const searchParams = {};
    searchParams['pickUpDate'] = this.pickUpDate;
    searchParams['dropOffDate'] = this.dropOffDate;
    searchParams['pickUpTime'] = this.searchForm.get('pickUpTime').value;
    searchParams['dropOffTime'] = this.searchForm.get('dropOffTime').value;
    searchParams['pickUpLocation'] = this.searchForm.get('pickUpLocation').value;
    searchParams['dropOffLocation'] = this.searchForm.get('dropOffLocation').value;
    searchParams['carBrand'] = this.searchForm.get('carBrand').value;
    searchParams['passengers'] = this.searchForm.get('passengers').value;


  }

}
