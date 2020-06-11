import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AirlineService } from '../../services/airline.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service.service';
import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Car } from '../../models/Car.model';
import { RentCarService } from '../../services/rent-a-car.service';
import { FlightReservation } from '../../models/flight-reservation.model';
import { FlightReservationService } from '../../services/flight-reservation.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Plane } from '../../models/plane';
import { FlightService } from 'src/app/services/flight.service';
import { Passenger } from 'src/app/models/passenger.model';
import { Seat } from 'src/app/models/seat.model';

@Component({
  selector: 'app-create-flight-reservation',
  templateUrl: './create-flight-reservation.component.html',
  styleUrls: ['./create-flight-reservation.component.css']
})
export class CreateFlightReservationComponent implements OnInit,AfterViewInit {
  showForm:boolean = false;
  flight:Flight;
  mySubscription:Subscription;

  toBeAdded:string[]=[];
  occupiedSeats:string[]=[];

  invitedFriends:string[]=[];
  cars:Car[]=[];

  filteredOptions: Observable<User[]>;
  options:User[];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  firstStep: FormGroup = new FormGroup({});
  secondStep: FormGroup = new FormGroup({});
  thirdStep: FormGroup = new FormGroup({});
  fourthStep: FormGroup = new FormGroup({});

  location:string;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  flightReservation:FlightReservation;
  loggedUser:User;

  numOfPassengers:number;
  class:string;

  get passengersControls() {
    return (this.thirdFormGroup.get('passengers') as FormArray).controls;
  }

  constructor(private route:ActivatedRoute,private router:Router,private modalService: NgbModal, private flightService:FlightService, private airlineService:AirlineService, private userService:UserService, private _formBuilder:FormBuilder, private rentCarService:RentCarService, private flightReservationService:FlightReservationService) {
      //this.toBeAdded=[];
   }


  ngAfterViewInit(): void {
    this.mySubscription = this.route.params.subscribe((params:Params)=>
      {
        this.flightService.getFlight(+params['id']).subscribe((res:any)=>{
          this.flight = res;
          this.location = this.flight.landingLocation.location;
          this.flight.occupiedSeats.forEach(element => {
            this.occupiedSeats.push(element.code);
          });
        });
      }
    )

    this.userService.getFriends().subscribe((res:any)=>{
      this.options = res;

      this.filteredOptions = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((user: string | null) => user ? this._filter(this.options, user) : this.options.slice()));
    });

    this.userService.getUser().subscribe((res:any)=>{
      this.loggedUser = res;
      this.initForm();
      
    });


    
  }

   initForm(){
    console.log(this.toBeAdded);
     let firstName = this.loggedUser.firstName;
     let lastName = this.loggedUser.lastName;

    let passenger1 = new FormGroup({
      'seati': new FormControl(this.toBeAdded[0], Validators.required),
      'firstNamei': new FormControl(firstName, Validators.required),
      'lastNamei':new FormControl(lastName, Validators.required),
      'passporti':new FormControl('', [Validators.required, Validators.pattern(new RegExp("^[A-Z][0-9]{8}$"))])
    });


    let passengers = new FormArray([]);

    this.thirdFormGroup = new FormGroup({
      'passenger1': passenger1,
      'passengers': passengers
    });


   }

   initThirdForm(){

     let seat ='';
     let firstName ='';
     let lastName ='';
     let passport='';

     const counter = this.toBeAdded.length;
     for(var i=1; i < counter; i++){
       console.log('to be added seats: ', this.toBeAdded[0]);
       if(this.invitedFriends.length>0 && i<=this.invitedFriends.length){
           seat = this.toBeAdded[i];
          console.log(this.toBeAdded[i].toString());
           firstName = this.invitedFriends[i-1].split(' ')[0].trim();
           lastName = this.invitedFriends[i-1].split(' ')[1].trim();
           passport = '';

          (<FormArray>this.thirdFormGroup.get('passengers')).push( new FormGroup({
            'seat': new FormControl(seat, Validators.required),
            'firstName': new FormControl(firstName, Validators.required),
            'lastName':new FormControl(lastName, Validators.required),
            'passport':new FormControl('', [Validators.required,Validators.pattern(new RegExp("^[A-Z][0-9]{8}$"))])
          }));

        }else{

          (<FormArray>this.thirdFormGroup.get('passengers')).push( new FormGroup({
            'seat': new FormControl('', Validators.required),
            'firstName': new FormControl('', Validators.required),
            'lastName':new FormControl('', Validators.required),
            'passport':new FormControl('', [Validators.required, Validators.pattern(new RegExp("^[A-Z][0-9]{8}$"))])
          }));
        }

     }

   }

   confirmReservation(){
    this.flightReservation = new FlightReservation();
    this.flightReservation.passengers = this.getPassengers();
    this.flightReservation.flightsIds.push(this.flight.id);
    //this.flightReservation.carReservation=undefined;

     if(this.flightReservation.carReservation===undefined){
      this.flightReservation.totalPrice = this.flightReservation.passengers.length * this.flight.segmentPrices.find(x=>x.segment.name===this.class).price;
      console.log('total price: ',this.flightReservation.totalPrice );
     }

     this.flightReservationService.completeReservation(this.flightReservation).subscribe((res:any)=>{
      Swal.fire({
        text: 'Reservation successfully made. Please check your email for more information!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      .then(()=>{
        //this.flightReservationService.resetReservation();
        this.router.navigate(['/user/reservations/flight-reservations']);
      })
  
     }, (err)=>{
      Swal.fire({
        text: err.error.message,
        icon: 'error',
        showConfirmButton: true
      })
     });
     
   }

   openSm(content) {
    this.modalService.open(content);
  }

   abortReservation(){
    this.router.navigate([""]);
   }

  ngOnInit(): void {
    

    this.mySubscription = this.route.params.subscribe((params:Params)=>
      {
        this.class = params['criteria'];
        this.numOfPassengers = +params['passengers'];

        console.log('class: ', this.class);
        console.log('passengers: ', this.numOfPassengers);
        this.flightService.getFlight(+params['id']).subscribe((res:any)=>{
          this.flight = res;
          this.location = this.flight.landingLocation.location;
        });
      }
    )
    
    //sthis.initForm();


    // this.secondFormGroup = new FormGroup({
    //   'fruitCtrl':new FormControl('')
    // });

    //this.cars.push(...this.rentCarService.getCarsAtLocation(this.location));

  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      //this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(friend: string): void {
    const index = this.invitedFriends.indexOf(friend);

    if (index >= 0) {
      this.invitedFriends.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.invitedFriends.push(event.option.viewValue);
    console.log(this.invitedFriends)
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }


  getPassengers():Passenger[]{
    let passengers:Passenger[]=[];
    var seats:Seat[]=[];
    seats.push(new Seat(this.thirdFormGroup.get('passenger1.seati').value, this.flight.id));
    let passenger1:Passenger = new Passenger(this.thirdFormGroup.get('passenger1.firstNamei').value, this.thirdFormGroup.get('passenger1.lastNamei').value, seats , this.thirdFormGroup.get('passenger1.passporti').value);
    passengers.push(passenger1);

    for(let control of this.passengersControls){
      var passengerSeats:Seat[]=[];
      passengerSeats.push(new Seat(control.get('seat').value, this.flight.id));
      let passenger = new Passenger(control.get('firstName').value, control.get('lastName').value, passengerSeats, control.get('passport').value );
      if(this.invitedFriends.includes(passenger.firstName+' '+passenger.lastName)){
        passenger.sendInvitation=true;
        passenger.acceptedInvitation=false;
      }
      passengers.push(passenger);
    }

    return passengers;
  }

  private _filter = (opt: User[], value: string): User[] => {
    const filterValue = value.toLowerCase();

    return opt.filter(item => item.getName().toLowerCase().indexOf(filterValue) === 0 );
  };

}
