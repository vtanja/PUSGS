import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flights-search-form',
  templateUrl: './flights-search-form.component.html',
  styleUrls: ['./flights-search-form.component.css']
})
export class FlightsSerachFormComponent implements OnInit {

  classes:Array<string>;
  returnFlight:string="oneWay";
  @ViewChild('returnDateInput',{static:true}) returnDateInput:ElementRef;

  searchForm:FormGroup;

  constructor(private router:Router,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {

    let params = this.activeRoute.snapshot.queryParams;
    console.log(params);

    let departureDate;
    let returnDate;

    if(params['departureDate']!=undefined) {
    const partsPickUp = params['departureDate'].split('-');
    const year = parseInt(partsPickUp[2]);
    const month= parseInt(partsPickUp[1]);
    const day= parseInt(partsPickUp[0]);
    departureDate = new NgbDate(year,month,day);
    }else{
      returnDate ="";
    }

    if( params['returnDate']!=undefined){
    const partsDropOff = params['returnDate'].split('-');
    const yearDropOff = parseInt(partsDropOff[2]);
    const monthDropOff = parseInt(partsDropOff[1]);
    const dayDropOff = parseInt(partsDropOff[0]);
    returnDate = new NgbDate(yearDropOff,monthDropOff,dayDropOff);
    }else{
     returnDate="";
    }

    const takeOffLocation = params['takeOffLocation']!=undefined?params['takeOffLocation'] :"";
    const landingLocation = params['landingLocation']!=undefined?params['landingLocation'] :"";
    const flightClass = params['class']!=undefined?params['class'] :"Economy";
    const passengers = params['passengers']!=undefined?params['passengers'] :"";

    this.classes = new Array<string>("Economy","Premium economy","Business class","First class");

    this.searchForm = new FormGroup({

      'locations' : new FormGroup({
        'takeOffLocation' : new FormControl(takeOffLocation,Validators.required),
        'landingLocation' : new FormControl(landingLocation,Validators.required)
      }),
      'departureDate' : new FormControl(departureDate,Validators.required),
      'returnDate' : new FormControl({value: returnDate, disabled: true}),
      'class' : new FormControl(flightClass,Validators.required),
      'passengers' : new FormControl(passengers,Validators.required)
    });
  }

  onFormSubmit(){

    const searchParams = {};

    let departureDate = this.searchForm.get('departureDate').value;
    let returnDate = this.searchForm.get('returnDate').value;

    searchParams['departureDate'] = departureDate.day + "-" + departureDate.month + "-" + departureDate.year;
    if(this.returnFlight==="oneway"){
      searchParams['returnDate']=undefined;
    }else{
      searchParams['returnDate'] = returnDate.day + "-" + returnDate.month + "-" + returnDate.year;
    }

    searchParams['takeOffLocation'] = this.searchForm.get('locations.takeOffLocation').value;
    searchParams['landingLocation'] = this.searchForm.get('locations.landingLocation').value;
    searchParams['class'] = this.searchForm.get('class').value;
    searchParams['passengers'] = this.searchForm.get('passengers').value;

    //console.log(searchParams);
    this.router.navigate(['/allFlights'],{queryParams:searchParams});

  }

  onReturnSelect(){
    this.searchForm.get('returnDate').enable();
  }

  onOneWaySelect(){
    this.searchForm.get('returnDate').disable();
  }

}

