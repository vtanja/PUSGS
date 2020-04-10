import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
  styleUrls: ['./flights-search.component.css']
})
export class FlightsSearchComponent implements OnInit {

  classes:Array<string>;

  searchForm:FormGroup;

  constructor(private router:Router,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {

    // let params = this.activeRoute.snapshot.queryParams;
    // console.log(params);

    // let pickUpDate;
    // let dropOffDate;

    // if(params['pickUpDate']!=undefined && params['dropOffDate']!=undefined){
    // const partsPickUp = params['pickUpDate'].split('-');
    // const year = parseInt(partsPickUp[2]);
    // const month= parseInt(partsPickUp[1]);
    // const day= parseInt(partsPickUp[0]);
    // pickUpDate = new NgbDate(year,month,day);

    // const partsDropOff = params['dropOffDate'].split('-');
    // const yearDropOff = parseInt(partsDropOff[2]);
    // const monthDropOff = parseInt(partsDropOff[1]);
    // const dayDropOff = parseInt(partsDropOff[0]);
    // dropOffDate = new NgbDate(yearDropOff,monthDropOff,dayDropOff);
    // }else{
    //  pickUpDate="";
    //  dropOffDate="";
    // }

    // const pickUpLocation = params['pickUpLocation']!=undefined?params['pickUpLocation'] :"";
    // const dropOffLocation = params['dropOffLocation']!=undefined?params['dropOffLocation'] :"";
    // const pickUpTime = params['pickUpTime']!=undefined?params['pickUpTime'] :"";
    // const dropOffTime = params['dropOffTime']!=undefined?params['dropOffTime'] :"";
    // const carBrand = params['carBrand']!=undefined?params['carBrand'] :"";
    // const passengers = params['passengers']!=undefined?params['passengers'] :"";

    this.classes = new Array<string>("Economy","Premium economy","Business class","First class");

    this.searchForm = new FormGroup({

      'locations' : new FormGroup({
        'takeOffLocation' : new FormControl("",Validators.required),
        'landingLocation' : new FormControl("",Validators.required)
      }),
      'dates' : new FormGroup({
        'departureDate' : new FormControl("",Validators.required),
        'returnDate' : new FormControl("")
      }),
      'class' : new FormControl(this.classes[0],Validators.required),
      'passengers' : new FormControl("",Validators.required)

    });
  }

  onFormSubmit(){

    // const searchParams = {};

    // let pickUpDate = this.searchForm.get('dates.pickUpDate').value;
    // let dropOffDate = this.searchForm.get('dates.dropOffDate').value;

    // searchParams['pickUpDate'] = pickUpDate.day + "-" + pickUpDate.month + "-" + pickUpDate.year;
    // searchParams['dropOffDate'] = dropOffDate.day + "-" + dropOffDate.month + "-" + dropOffDate.year;
    // searchParams['pickUpTime'] = this.searchForm.get('times.pickUpTime').value;
    // searchParams['dropOffTime'] = this.searchForm.get('times.dropOffTime').value;
    // searchParams['pickUpLocation'] = this.searchForm.get('location.pickUpLocation').value;
    // searchParams['dropOffLocation'] = this.searchForm.get('location.dropOffLocation').value;
    // searchParams['carBrand'] = this.searchForm.get('carBrand').value;
    // searchParams['passengers'] = this.searchForm.get('passengers').value;

   // this.router.navigate(['/allCars'],{queryParams:searchParams});

  }

}

