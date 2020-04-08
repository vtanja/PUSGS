import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cars-search',
  templateUrl: './cars-search.component.html',
  styleUrls: ['./cars-search.component.css']
})
export class CarsSearchComponent implements OnInit {

  model: NgbDateStruct;
  times:Array<string>;

  constructor() { }

  ngOnInit(): void {

    this.times = new Array<string>("00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",);
  }

}
