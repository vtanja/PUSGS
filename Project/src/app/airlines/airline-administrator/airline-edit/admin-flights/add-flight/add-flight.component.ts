import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { startWith, map } from 'rxjs/operators';
import airports from '../../../../../airports.json';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Plane } from 'src/app/models/plane';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Flight } from 'src/app/models/flight.model';
import { Airport } from 'src/app/models/airport';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  addFlightForm:FormGroup;
  @ViewChild('returnDateInput',{static:true}) returnDateInput:ElementRef;
  @ViewChild('segmentInput') segmentInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  segmentCtrl=new FormControl();

  takeOffLocationOptions: Observable<{}[]>;
  landingLocationOptions: Observable<{}[]>;

  minutes:string[]=[];
  hours:string[]=[];

  planes:Plane[]=[];
  chosenPlane:Plane;

  chosenAirports:{}[]=[];
  filteredAirports:Observable<{}[]>;

  planeSegments:string[]=[];

  constructor(private router:Router,private activeRoute:ActivatedRoute, private config: NgbDatepickerConfig, private airlineAdminService:AirlineAdministratorService) {

    this.planes=airlineAdminService.getAirline().planes;
    
    

    this.addFlightForm = new FormGroup({
      'plane':new FormControl('', Validators.required),
      'locations':new FormGroup({
        'takeOffLocation':new FormControl('', Validators.required),
        'landingLocation':new FormControl('', Validators.required)
      }),
      'departureDate':new FormControl('', Validators.required),
      'returnDate':new FormControl('', Validators.required),
      'times':new FormGroup({
        'departureTimeHour':new FormControl('', Validators.required),
        'departureTimeMin':new FormControl('', Validators.required),
        'landingTimeHour':new FormControl('', Validators.required),
        'landingTimeMin':new FormControl('', Validators.required) 
      }),
      'prices':new FormGroup({
        'economyPrice':new FormControl(''),
        'economyPremiumPrice':new FormControl(''),
        'businessPrice':new FormControl(''),
        'firstPrice':new FormControl(''),
      })
    });

    const current = new Date();
    config.minDate = { year: current.getFullYear(), month:
      current.getMonth() + 1, day: current.getDate() };
      config.outsideDays = 'hidden';

      for(var i =0; i<60; i++){
        this.minutes.push(i.toString());
      }

      for(var i =0; i<24; i++){
        this.hours.push(i.toString());
      }
  }


  ngOnInit(): void {
    this.filteredAirports = this.segmentCtrl.valueChanges.pipe(
      startWith(null),
      map((segment: string | null) => segment ? this._filter2(airports, segment) : airports.slice()));

    this.takeOffLocationOptions = this.addFlightForm.get('locations.takeOffLocation')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(airports, value))
    );

    this.landingLocationOptions = this.addFlightForm.get('locations.landingLocation')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(airports, value))
    );

    this.addFlightForm.get('plane')!.valueChanges.subscribe(plane=>{
      this.chosenPlane=this.airlineAdminService.getAirline().planes.find(p=>p.name===plane);
      if(this.chosenPlane!==undefined){
        for(let segment of this.chosenPlane.segments)
        this.planeSegments.push(segment.name);
      

      if(this.planeSegments.includes('Economy class')){
        this.addFlightForm.get('economyPrice').setValidators(Validators.required);
        this.addFlightForm.get('economyPrice').updateValueAndValidity();
      }
      if(this.planeSegments.includes('Economy premium')){
        this.addFlightForm.get('premiumPrice').setValidators(Validators.required);
        this.addFlightForm.get('premiumPrice').updateValueAndValidity();
      }
      if(this.planeSegments.includes('Business class')){
        this.addFlightForm.get('businessPrice').setValidators(Validators.required);
        this.addFlightForm.get('businessPrice').updateValueAndValidity();
      }
      if(this.planeSegments.includes('First class')){
        this.addFlightForm.get('firstPrice').setValidators(Validators.required);
        this.addFlightForm.get('firstPrice').updateValueAndValidity();
      }}
    });

  }

  private _filter(toFilter:{code:string, name:string, location:string}[], value: string): {code:string, name:string, location:string}[] {
    const filterValue = value.toLowerCase();

    return toFilter.filter(item => item.code.toLowerCase().includes(filterValue) || item.location.toLowerCase().includes(filterValue));
  }

  private _filter2 = (opt: {code:string, name:string, location:string}[], value: string): {code:string, name:string, location:string}[] => {
    const filterValue = value.toLowerCase();
  
    return opt.filter(item => item.code.toLowerCase().indexOf(filterValue) === 0 || item.location.toLowerCase().indexOf(value)===0);
  };

  noStopsSelect(){
    this.addFlightForm.get('stopsNo').disable();
  }

  withStopsSelect(){
    this.addFlightForm.get('stopsNo').enable();
  }


  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.segmentCtrl.setValue(null);
  }

  
  remove(segment: string): void {
    const index = this.chosenAirports.indexOf(segment);

    if (index >= 0) {
      this.chosenAirports.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.chosenAirports.includes(event.option.viewValue)){
      this.chosenAirports.push(event.option.viewValue);
    }
    console.log(this.chosenAirports)
    this.segmentInput.nativeElement.value = '';
    this.segmentCtrl.setValue(null);
  }

 

  onAddFlight(){
    let takeOffLocation=this.addFlightForm.get('locations.takeOffLocation').value;
    let landingLocation=this.addFlightForm.get('locations.landingLocation').value;
    let takeOffDate=this.addFlightForm.get('departureDate').value;
    let landingDate=this.addFlightForm.get('returnDate').value;
    //let tl = new Airport(takeOffLocation, airports.find(a=>a.iata===takeOffLocation).location);
    //let ll = new Airport(landingLocation, airports.find(a=>a.iata===landingLocation).location);
    let takeOffTime=this.addFlightForm.get('times.departureTimeHour').value+':'+this.addFlightForm.get('times.departureTimeMin').value;
    let landingTime=this.addFlightForm.get('times.landingTimeHour').value+':'+this.addFlightForm.get('times.landingTimeMin').value;
    //var flight = new Flight(this.airlineAdminService.getAirline().flights.length, undefined, undefined, takeOffDate, landingDate, takeOffTime, landingTime, 0, 0, [], +this.addFlightForm.get('prices.economyPrice').value, 0,0,0,0 );
    console.log(this.addFlightForm);
    //console.log(flight);
  }
}
