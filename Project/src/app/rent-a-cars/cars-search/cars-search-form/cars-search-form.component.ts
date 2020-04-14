import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbDateStruct, NgbDate, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { RentCarService } from '../../rent-a-car.service';
import { Observable } from 'rxjs/internal/Observable';
import {startWith, map} from 'rxjs/operators';


export interface LocationGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-cars-search-form',
  templateUrl: './cars-search-form.component.html',
  styleUrls: ['./cars-search-form.component.css']
})

export class CarsSearchFormComponent implements OnInit {

  stateForm: FormGroup = this._formBuilder.group({
    locationGroup: '',
  });

  locationGroups: LocationGroup[] =[
  {
    letter: 'B',
    names: ['Belgrade, Serbia','Budapest, Hungary','Banja Luka, BiH']

  },
   {
    letter: 'D',
    names: ['Dubrovnik, Croatia']
  }, {
    letter: 'M',
    names: ['Mostar, BiH','Munich, Germany']
  }, {
    letter: 'N',
    names: ['Novi Sad, Serbia','Novo Mesto, Slovenia']
  }, {
    letter: 'T',
    names: ['Trebinje, BiH']
  }];

  pickUpLocationOptions: Observable<LocationGroup[]>;
  dropOffLocationOptions: Observable<LocationGroup[]>;

  times:Array<string>;
  cars:Array<string>;

  searchForm:FormGroup;
  searched:boolean;

  @Input('companyID') companyID:number;

  constructor(private router:Router,private activeRoute:ActivatedRoute,private _formBuilder: FormBuilder,
    private rentCarsService:RentCarService,private config: NgbDatepickerConfig) {
      const current = new Date();
      config.minDate = { year: current.getFullYear(), month:
      current.getMonth() + 1, day: current.getDate() };
      config.outsideDays = 'hidden';
    }


  ngOnInit(): void {

    let params = this.activeRoute.snapshot.queryParams;

    let pickUpDate;
    let dropOffDate;

    if(params['pickUpDate']!=undefined && params['dropOffDate']!=undefined){
    const partsPickUp = params['pickUpDate'].split('-');
    const year = parseInt(partsPickUp[2]);
    const month= parseInt(partsPickUp[1]);
    const day= parseInt(partsPickUp[0]);
    pickUpDate = new NgbDate( year,month,day);

    const partsDropOff = params['dropOffDate'].split('-');
    const yearDropOff = parseInt(partsDropOff[2]);
    const monthDropOff = parseInt(partsDropOff[1]);
    const dayDropOff = parseInt(partsDropOff[0]);
    dropOffDate = new NgbDate(yearDropOff,monthDropOff,dayDropOff);

    this.searched=true;

    }else{
     pickUpDate="";
     dropOffDate="";
     this.searched=false;
    }

    const pickUpLocation = params['pickUpLocation']!=undefined?params['pickUpLocation'] :"";
    const dropOffLocation = params['dropOffLocation']!=undefined?params['dropOffLocation'] :"";
    const pickUpTime = params['pickUpTime']!=undefined?params['pickUpTime'] :"";
    const dropOffTime = params['dropOffTime']!=undefined?params['dropOffTime'] :"";
    const carBrand = params['carBrand']!=undefined?params['carBrand'] :"";
    const passengers = params['passengers']!=undefined?params['passengers'] :"";

    this.times = new Array<string>("00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",);

    this.cars = new Array<string>("BMW","Golf", "Kia","Ford" ,"Renault","Toyota","Peugeot","Citroen","Nissan","Audi","Yugo","Mercedes");

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

    this.pickUpLocationOptions = this.searchForm.get('location.pickUpLocation')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

      this.dropOffLocationOptions = this.searchForm.get('location.dropOffLocation')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

  }


  private _filterGroup(value: string): LocationGroup[] {
    if (value) {
      return this.locationGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.locationGroups;
  }

  onFormSubmit(){

    const searchParams = {};
    this.searched=true;

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
     this.router.navigate(['/allCars'],{queryParams:searchParams});
    }
    else{
      searchParams['companyID'] = this.companyID;
      this.rentCarsService.searchCarsParamsSubject.next(searchParams);
    }

    console.log(searchParams);

  }

  onClear(){

    this.searchForm.setValue({
      'location' :({
        'pickUpLocation' : "",
        'dropOffLocation' : ""
      }),
      'dates' :({
        'pickUpDate':"",
        'dropOffDate' : ""
      }),

      'times' :({
        'pickUpTime': "",
        'dropOffTime' : ""
      }),

      'carBrand' : "",
      'passengers' : ""

    });

    this.searched=false;
    if(this.companyID===undefined){
     this.router.navigate(['/allCars']);
    }
    else{
      this.rentCarsService.searchCarsParamsSubject.next({});
    }

  }

}
