import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FlightReservation } from 'src/app/models/flight-reservation.model';
import { Flight } from 'src/app/models/flight.model';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-reservation-item',
  templateUrl: './flight-reservation-item.component.html',
  styleUrls: ['./flight-reservation-item.component.css']
})
export class FlightReservationItemComponent implements OnInit,OnDestroy {

  @Input() flightReservation:FlightReservation;
  flight:Flight;
  company:Airline;
  closeResult = '';
  car:Car;
  rentalCompany:RentCar;
  toRate:string;
  canRate:boolean;
  modalCloseSubscription:Subscription;

  constructor(private airlineService:AirlineService, private modalService: NgbModal, private rentCarService:RentCarService) { }

  ngOnInit(): void {
    //this.flight = this.airlineService.getAirline(this.flightReservation.companyID).flights.find(c=>c.id==this.flightReservation.flightID);
    //this.company = this.airlineService.getAirline(this.flightReservation.companyID);
    console.log(this.company);
    if(this.flightReservation.carReservation!==undefined){
      //this.rentalCompany = this.rentCarService.getRentCarCompany(this.flightReservation.carReservation.companyId);
      console.log(this.rentalCompany);
    }

    this.modalCloseSubscription = this.airlineService.rateModalClose.subscribe(()=>{
      this.modalService.dismissAll();
    })

    var i = 0;
    if(this.flightReservation.carReservation!==undefined){
        //this.rentalCompany=this.rentCarService.getRentCarCompany(this.flightReservation.carReservation.companyId);
    }

    var today = new Date();

    var dateParts = this.flight.landingDate.split('-');
    var timeParts = this.flight.landingTime.split(':');
    var landingDate = new Date(+dateParts[2],+dateParts[1]-1,+dateParts[0],+timeParts[0],+timeParts[1],0);

    if(landingDate<=today)
      this.canRate = true;

    console.log(this.flightReservation);

  }

  ngOnDestroy():void{
    this.modalCloseSubscription.unsubscribe();
  }

  openRateModal(content,rateItem) {

    this.toRate = rateItem

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
