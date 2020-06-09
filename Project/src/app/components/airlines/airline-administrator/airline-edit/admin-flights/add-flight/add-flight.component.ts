import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { startWith, map } from 'rxjs/operators';
import airports from '../../../../../../airports.json';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Plane } from 'src/app/models/plane';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Flight } from 'src/app/models/flight.model';
import { Airport } from 'src/app/models/airport';
import { PlaneService } from 'src/app/services/plane.service';
import { Airline } from 'src/app/models/airline.model';
import { DestinationService } from 'src/app/services/destination.service';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';
import { Segment } from 'src/app/models/segment';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit, AfterViewInit {

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

  chosenAirports:Airport[]=[];
  filteredAirports:Observable<{}[]>;

  planeSegments:Segment[]=[];
  segments:string[]=[];
  noStops=true;
  possibleLocations=[];
  airline:Airline;
  destinations=[];

  constructor(private router:Router,private activeRoute:ActivatedRoute, 
    private config: NgbDatepickerConfig, 
    private airlineAdminService:AirlineAdministratorService,
     private planeService:PlaneService, private destService:DestinationService, private flightService:FlightService)
 {
  console.log(airports);

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

  ngAfterViewInit(): void {

    this.airlineAdminService.getAirline().subscribe((res:any)=>{
      this.airline=res;
      
      this.possibleLocations=[];

      this.destinations = this.destService.getDestinations(this.airline);
    
      airports.forEach(element => {
        if(this.destinations.find(x=>x.city+', '+x.country === element.location)){
          this.possibleLocations.push(element);
        }
      });
    })

    this.addFlightForm.get('plane')!.valueChanges.subscribe(plane=>{
      this.planeService.getPlane(plane).subscribe((res:any)=>{
        this.chosenPlane = res;
        this.planeSegments=[];
        this.chosenPlane.segments.forEach(element => {
          this.planeSegments.push(element);
          this.segments.push(element.name);
        });
        console.log('segments: ', this.planeSegments);
        
      });
      
      // if(this.chosenPlane !== undefined){
      //   if(this.planeSegments.find(x=>x.name==='Economy class')!==undefined){
      //     this.addFlightForm.get('prices.economyPrice').setValidators(Validators.required);
      //     this.addFlightForm.get('prices.economyPrice').updateValueAndValidity();
      //   }
      //   if(this.planeSegments.find(x=>x.name==='Premium economy')!==undefined){
      //     this.addFlightForm.get('prices.economyPremiumPrice').setValidators(Validators.required);
      //     this.addFlightForm.get('prices.economyPremiumPrice').updateValueAndValidity();
      //   }
      //   if(this.planeSegments.find(x=>x.name==='Business class')!==undefined){
      //     this.addFlightForm.get('prices.businessPrice').setValidators(Validators.required);
      //     this.addFlightForm.get('prices.businessPrice').updateValueAndValidity();
      //   }
      //   if(this.planeSegments.find(x=>x.name==='First class')!==undefined){
      //     this.addFlightForm.get('prices.firstPrice').setValidators(Validators.required);
      //     this.addFlightForm.get('prices.firstPrice').updateValueAndValidity();
      //   }
      // }
    });
  }


  ngOnInit(): void {

    this.planeService.getPlanes().subscribe((res:any)=>{
      this.planes=res;
    });

    this.filteredAirports = this.segmentCtrl.valueChanges.pipe(
      startWith(null),
      map((segment: {code:string, name:string, location:string} | null) => segment ? this._filter2(this.possibleLocations, segment) : this.possibleLocations.slice()));

    this.takeOffLocationOptions = this.addFlightForm.get('locations.takeOffLocation')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.possibleLocations, value))
    );

    this.landingLocationOptions = this.addFlightForm.get('locations.landingLocation')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.possibleLocations, value))
    );

    

  }

  private _filter(toFilter:{code:string, name:string, location:string}[], value: string): {code:string, name:string, location:string}[] {
    const filterValue = value.toLowerCase();

    return toFilter.filter(item => item.code.toLowerCase().includes(filterValue) || item.location.toLowerCase().includes(filterValue));
  }

  private _filter2 = (opt: {code:string, name:string, location:string}[], value: {code:string, name:string, location:string}): {code:string, name:string, location:string}[] => {
   
    return opt.filter(item => item.code.toLowerCase().indexOf(value.code.toLowerCase()) === 0 || item.location.toLowerCase().indexOf(value.location.toLowerCase())===0);
  };

  noStopsSelect(){
    this.noStops=true;
  }

  withStopsSelect(){
    console.log(this.addFlightForm);
    this.noStops=false;
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


  remove(segment: Airport): void {
    const index = this.chosenAirports.indexOf(segment);

    if (index >= 0) {
      this.chosenAirports.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.chosenAirports.includes(event.option.value) ){
      if(event.option.value.code !== this.addFlightForm.get('locations.takeOffLocation').value && event.option.value.code !== this.addFlightForm.get('locations.landingLocation').value ){
        this.chosenAirports.push(event.option.value);
      }
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

    let tl = this.possibleLocations.find(x=>x.code===takeOffLocation);
    let ll = this.possibleLocations.find(x=>x.code===landingLocation);

    let duration;
    var d1:Date = new Date(takeOffDate['year'], takeOffDate['month'], takeOffDate['day'], +this.addFlightForm.get('times.departureTimeHour').value, +this.addFlightForm.get('times.departureTimeMin').value);
     var d2:Date = new Date(takeOffDate.year, landingDate.month, landingDate.day, +this.addFlightForm.get('times.landingTimeHour').value, +this.addFlightForm.get('times.landingTimeMin').value);
    duration = Math.round((d2.getTime()-d1.getTime())/1000/60);
    
    var segmentPrices:{segment:Segment, price:number}[]=[];

    console.log(this.addFlightForm);
    if(this.addFlightForm.get('prices.firstPrice').value!=='' && this.planeSegments.find(x=>x.name==='First class')!==undefined){
      
      var segment = this.planeSegments.find(x=>x.name==='First class');
      segmentPrices.push({segment:segment, price:+this.addFlightForm.get('prices.firstPrice').value});
      //price.push({segment:segment, price:+this.addFlightForm.get('prices.firstPrice').value})
    }
    if(this.addFlightForm.get('prices.businessPrice').value!=='' && this.planeSegments.find(x=>x.name==='Business class')!==undefined){
      
      var segment = this.planeSegments.find(x=>x.name==='Business class');
      //price['Business class'] = +this.addFlightForm.get('businessPrice').value;
      segmentPrices.push({segment:segment, price:+this.addFlightForm.get('prices.businessPrice').value});
      //price.push({segment:segment, price:+this.addFlightForm.get('prices.businessPrice').value})
    }
    if(this.addFlightForm.get('prices.economyPremiumPrice').value!=='' && this.planeSegments.find(x=>x.name==='Premium economy')!==undefined){
     
      var segment = this.planeSegments.find(x=>x.name==='Premium economy');
      segmentPrices.push({segment:segment, price:+this.addFlightForm.get('prices.economyPremiumPrice').value});
      //price['Premium economy'] = +this.addFlightForm.get('premiumPrice').value;
      //price.push({segment:segment, price:+this.addFlightForm.get('prices.economyPremiumPrice').value})
    }
    if(this.addFlightForm.get('prices.economyPrice').value!=='' && this.planeSegments.find(x=>x.name==='Economy class')!==undefined){
      
      var segment = this.planeSegments.find(x=>x.name==='Economy class');
      segmentPrices.push({segment:segment, price:+this.addFlightForm.get('prices.economyPrice').value});
      //price['Economy class'] = +this.addFlightForm.get('economyPrice').value;
      //price.push({segment:segment, price:+this.addFlightForm.get('prices.economyPrice').value})
    }
    
    var toAdd:Flight = new Flight(-1, tl, ll, d1.getDate()+'-'+d1.getMonth()+'-'+d1.getFullYear(), d2.getDate()+'-'+d2.getMonth()+'-'+d2.getFullYear(), d1.getHours()+':'+d1.getMinutes(), d2.getHours()+':'+d2.getMinutes(), duration, this.chosenAirports, segmentPrices, this.chosenPlane.code );
console.log(toAdd);
    this.flightService.addFlight(toAdd).subscribe((res:any)=>{
      Swal.fire({
        text: 'Successfully added new flight!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.router.navigate(['/admin-flights']);
      });
    
    }, (err)=>{
      Swal.fire({
        text: err.error.message,
        icon: 'error',
        showConfirmButton: true
      });
    });
  }


  isValidFirstPrice():boolean{
    if(this.segments.includes('First class') && this.addFlightForm.get('prices.firstPrice').value===''){
      return false;
    }
    return true;
  }

  isValidBusinessPrice():boolean{
    if(this.segments.includes('Business class') && this.addFlightForm.get('prices.businessPrice').value===''){
      return false;
    }
    return true;
  }

  isValidEconomyPrice():boolean{
    if(this.segments.includes('Economy class') && this.addFlightForm.get('prices.economyPrice').value===''){
      return false;
    }
    return true;
  }

  isValidPremiumPrice():boolean{
    if(this.segments.includes('Premium economy') && this.addFlightForm.get('prices.premiumEconomyPrice').value===''){
      return false;
    }
    return true;
  }
}
