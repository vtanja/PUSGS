import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AirlineService } from '../services/airline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../models/Car.model';
import { RentCarService } from '../services/rent-a-car.service';
import { startWith, map } from 'rxjs/operators';
import { NgbDatepickerConfig, ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightReservationService } from '../services/flight-reservation.service';
import { CarReservation } from '../models/car-reservation.model';
import { UserService } from '../services/user-service.service';
import { RentCar } from '../models/rent-a-car.model';
import { Airline } from '../models/airline.model';
import { FlightReservation } from '../models/flight-reservation.model';
import Swal from 'sweetalert2';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
export interface LocationGroup {
  letter: string;
  names: string[];
}

@Component({
  selector: 'app-create-car-reservation',
  templateUrl: './create-car-reservation.component.html',
  styleUrls: ['./create-car-reservation.component.css']
})
export class CreateCarReservationComponent implements OnInit {
  flight:Flight;
  car:Car;
  rentalCompany:RentCar;
  company:Airline;
  flightReservation:FlightReservation;
  reservationForm:FormGroup;
  closeResult='';

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
    
    dropOffLocationOptions: Observable<LocationGroup[]>;
  

  constructor(private airlineService:AirlineService,private router:Router, private route:ActivatedRoute,private userService:UserService,private modalService: NgbModal, private rentCarService:RentCarService, private config: NgbDatepickerConfig, private flightReservationService:FlightReservationService) { 
  }

  ngOnInit(): void {
    this.flight = this.airlineService.getFlight(+this.route.snapshot.params['id']);
    this.company = this.flight.airline;
    const carId = +this.route.snapshot.params['carid'];
    
    var startParts = this.flight.landingDate.split('-');

    var current = new Date(+startParts[2],+startParts[1]-1,+startParts[0]);
    
    console.log(current);
    this.config.minDate = { year: current.getFullYear(), month:
    current.getMonth() + 1, day: current.getDate() };
    this.config.outsideDays = 'hidden';

    this.flightReservation = this.flightReservationService.getPendingReservation();
    console.log(carId);
    this.car = this.rentCarService.getCarFromId(carId);
      this.reservationForm = new FormGroup({
          'dropOffDate':new FormControl(new Date().toString(), Validators.required),
          'dropOffLocation':new FormControl('', Validators.required)
      });

      this.dropOffLocationOptions = this.reservationForm.get('dropOffLocation')!.valueChanges
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

  getDaysBetween(start:string,end:string):number{

    const ONE_DAY = 1000 * 60 * 60 * 24;

    var startParts = start.split('-');
    var endParts = end.split('-');

    var date1 = new Date(+startParts[2],+startParts[1]-1,+startParts[0]);
    var date2 = new Date(+startParts[2],+startParts[1]-1,+startParts[0]);
    

    console.log(date1);
    console.log(date2);

    const diffDays = Math.round(Math.abs((+date1 - +date2) / ONE_DAY));
    return diffDays;
  }

  quitReservation(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable:true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


  createReservation(){
    //kreiranje rezervacije
    const returnDate = this.reservationForm.get('dropOffDate').value;
    console.log(returnDate);
    const date:string = returnDate.day.toString()+'-'+returnDate.month.toString()+'-'+returnDate.year.toString();
    console.log(date);
    const days = this.getDaysBetween(this.flight.landingDate, date)+1;
    console.log(days);
    this.rentalCompany = this.rentCarService.getRentCars().find(x=>x.name===this.car.companyName);
    
    const companyId = this.rentalCompany.id;
    console.log(companyId);

    if(this.flightReservation!==undefined){
    this.flightReservation.carReservation = new CarReservation(this.flight.takeOffDate, this.flight.landingTime, date, "10:00", days, days*this.car.pricePerDay, companyId, this.car.companyName, this.car.id, this.userService.getLoggedUser().username, this.car.model );
    this.flightReservation.price +=this.flightReservation.carReservation.price;
    this.flightReservationService.saveReservation(this.flightReservation);
    console.log(this.flightReservation);
  }


  }


  saveReservation(){
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

  abortReservation(){
    this.router.navigate([""]);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable:true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
