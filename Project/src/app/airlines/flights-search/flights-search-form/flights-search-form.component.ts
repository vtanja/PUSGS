import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDate, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import airports from '../../../airports.json';
import{startWith, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  takeOffLocationOptions: Observable<{}[]>;
  landingLocationOptions: Observable<{}[]>;

  constructor(private router:Router,private activeRoute:ActivatedRoute, private config: NgbDatepickerConfig) {
    const current = new Date();
      config.minDate = { year: current.getFullYear(), month:
      current.getMonth() + 1, day: current.getDate() };
      config.outsideDays = 'hidden';
  }

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

    this.takeOffLocationOptions = this.searchForm.get('locations.takeOffLocation')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(airports, value))
    );

    this.landingLocationOptions = this.searchForm.get('locations.landingLocation')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(airports, value))
    );

  }

  private _filter(toFilter:{code:string, name:string, location:string}[], value: string): {code:string, name:string, location:string}[] {
    const filterValue = value.toLowerCase();

    return toFilter.filter(item => item.code.toLowerCase().includes(filterValue) || item.location.toLowerCase().includes(filterValue));
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

   // this.router.navigate(['/allCars'],{queryParams:searchParams});
   console.log(searchParams);
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

