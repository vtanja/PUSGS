import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars-search',
  templateUrl: './cars-search.component.html',
  styleUrls: ['./cars-search.component.css']
})
export class CarsSearchComponent implements OnInit {

  times:Array<string>;
  cars:Array<string>;

  searchForm:FormGroup;

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.times = new Array<string>("00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",);

    this.cars = new Array<string>("BMW","VW","RENAULT","TOYOTA","PEUGEOT","CITROEN","NISSAN","AUDI");

    this.searchForm = new FormGroup({

      'location' : new FormGroup({
        'pickUpLocation' : new FormControl(""),
        'dropOffLocation' : new FormControl("")
      }),
      'dates' : new FormGroup({
        'pickUpDate': new FormControl(""),
        'dropOffDate' : new FormControl("")
      }),

      'times' : new FormGroup({
        'pickUpTime': new FormControl(""),
        'dropOffTime' : new FormControl("")
      }),

      'carBrand' : new FormControl(""),
      'passengers' : new FormControl("")

    });
  }

  onFormSubmit(){
    const searchParams = {};
    searchParams['pickUpDate'] = this.searchForm.get('dates.pickUpDate').value;
    searchParams['dropOffDate'] = this.searchForm.get('dates.dropOffDate').value;
    searchParams['pickUpTime'] = this.searchForm.get('times.pickUpTime').value;
    searchParams['dropOffTime'] = this.searchForm.get('times.dropOffTime').value;
    searchParams['pickUpLocation'] = this.searchForm.get('location.pickUpLocation').value;
    searchParams['dropOffLocation'] = this.searchForm.get('location.dropOffLocation').value;
    searchParams['carBrand'] = this.searchForm.get('carBrand').value;
    searchParams['passengers'] = this.searchForm.get('passengers').value;

    console.log(searchParams);

    this.router.navigate(['/allCars'],{queryParams:searchParams});

  }

}
