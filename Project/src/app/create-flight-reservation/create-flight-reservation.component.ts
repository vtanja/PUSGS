import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Flight } from '../models/flight.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AirlineService } from '../services/airline.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user';
import { SeatsLayout } from '../models/seats-layout';
import { UserService } from '../services/user-service.service';
import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Car } from '../models/Car.model';
import { RentCarService } from '../services/rent-a-car.service';
import { FlightReservation } from '../models/flight-reservation.model';
import { FlightReservationService } from '../services/flight-reservation.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Passenger {
  seat: number;
  passenger: {firstname:string, lastname:string, passportNo:string};
}

@Component({
  selector: 'app-create-flight-reservation',
  templateUrl: './create-flight-reservation.component.html',
  styleUrls: ['./create-flight-reservation.component.css']
})
export class CreateFlightReservationComponent implements OnInit {

  flight:Flight;
  mySubscription:Subscription;

  toBeAdded:string[]=[];

  invitedFriends:string[]=[];
  cars:Car[]=[];
  
  filteredOptions: Observable<User[]>;
  options:User[];

  seatsLayout:SeatsLayout = {
    totalRows:10,
    seatsPerRow:6,
    seatNaming:'rowType',
    booked:['1A','5D']   
  };

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  hiddenButton=false;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  flightReservation:FlightReservation;

  get passengersControls() {
    return (this.thirdFormGroup.get('passengers') as FormArray).controls;
  }

  constructor(private route:ActivatedRoute,private router:Router,private modalService: NgbModal, private airlineService:AirlineService, private userService:UserService, private _formBuilder:FormBuilder, private rentCarService:RentCarService, private flightReservationService:FlightReservationService) {
     
      this.options = this.userService.getLoggedUser().friends.slice();

      this.filteredOptions = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((user: string | null) => user ? this._filter(this.options, user) : this.options.slice()));

   }
  
   initForm(){
     var seat = this.toBeAdded[0];
     console.log(seat);
     let firstName = this.userService.getLoggedUser().firstName;
     let lastName = this.userService.getLoggedUser().lastName;

    let passenger1 = new FormGroup({
      'seati': new FormControl('', Validators.required),
      'firstNamei': new FormControl(firstName, Validators.required),
      'lastNamei':new FormControl(lastName, Validators.required),
      'passporti':new FormControl('', [Validators.required, Validators.pattern(new RegExp("^[A-Z][0-9]{8}$"))])
    });

    passenger1.patchValue({seati:this.toBeAdded[1]});

    let passengers = new FormArray([]);

    this.thirdFormGroup = new FormGroup({
      'passenger1': passenger1,
      'passengers': passengers
    });

    
   }

   initThirdForm(){

    console.log(this.thirdFormGroup.get('passenger1'));
     console.log('To be added');
     console.log(this.toBeAdded);
     let seat ='';
     let firstName ='';
     let lastName ='';
     let passport='';

     const counter = this.toBeAdded.length;
     for(var i=1; i < counter; i++){
       if(this.invitedFriends.length>0){
        while(i < this.invitedFriends.length){
           seat = this.toBeAdded[i];
          console.log(this.toBeAdded[i].toString());
           firstName = this.invitedFriends[i].split(' ')[0].trim();
           lastName = this.invitedFriends[i].split(' ')[1].trim();
           passport = '';

          (<FormArray>this.thirdFormGroup.get('passengers')).push( new FormGroup({
            'seat': new FormControl(seat, Validators.required),
            'firstName': new FormControl(this.invitedFriends[i].split(' ')[0].trim(), Validators.required),
            'lastName':new FormControl(lastName, Validators.required),
            'passport':new FormControl('', [Validators.required,Validators.pattern(new RegExp("^[A-Z][0-9]{8}$"))])
          }));
          }
        }
          (<FormArray>this.thirdFormGroup.get('passengers')).push( new FormGroup({
            'seat': new FormControl('', Validators.required),
            'firstName': new FormControl('', Validators.required),
            'lastName':new FormControl('', Validators.required),
            'passport':new FormControl('', [Validators.required, Validators.pattern(new RegExp("^[A-Z][0-9]{8}$"))])
          }));
        
     }

     this.hiddenButton=true;
     console.log(this.passengersControls);
   }

   confirmReservation(){
     this.flightReservationService.completeReservation();
     Swal.fire({
      text: 'Reservation successfully made. Please check your email for more information!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(()=>{
      this.router.navigate(['/user/reservations/flight-reservations']);
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
        this.flight = this.airlineService.getFlight(+params['id']);
        console.log(this.flight);
      }
    )

    
    this.flightReservation = new FlightReservation("REZ1", this.flight.id, this.flight.airline.id, 0, []);
    
    this.secondFormGroup = new FormGroup({
      'friends':new FormControl('')
    });

    this.initForm();

    //var location=this.flight.landingLocation.place;
    var location = "Belgrade, Serbia";
    console.log(location);
    this.cars.push(...this.rentCarService.getCarsAtLocation(location));
    console.log(this.cars);
    
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


  getPassengers(){
    let pass1:Passenger={seat:this.thirdFormGroup.get('passenger1.seati').value,
     passenger:{firstname:this.thirdFormGroup.get('passenger1.firstNamei').value, 
     lastname:this.thirdFormGroup.get('passenger1.lastNamei').value, 
     passportNo:this.thirdFormGroup.get('passenger1.passporti').value}};
    this.flightReservation.passengers.push(pass1);

    for(let control of this.passengersControls){
      pass1={seat:control.get('seat').value,
     passenger:{firstname:control.get('firstName').value, 
     lastname:control.get('lastName').value, 
     passportNo:control.get('passport').value}};
    this.flightReservation.passengers.push(pass1);
    }

    const price = this.flightReservation.passengers.length*this.flight.price;
    console.log(price);
    this.flightReservation.price=price;
    console.log(this.flightReservation.price);
    this.flightReservationService.saveReservation(this.flightReservation);
    console.log(this.flightReservation.passengers);
  }

  private _filter = (opt: User[], value: string): User[] => {
    const filterValue = value.toLowerCase();
  
    return opt.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0 );
  };

}
