import { Component, OnInit, Input } from '@angular/core';
import { FlightReservation } from 'src/app/models/flightReservation.model';
import { Flight } from 'src/app/models/flight';
import { Airline } from 'src/app/models/airline';
import { AirlineService } from 'src/app/airlines/airline.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { RentCarService } from 'src/app/rent-a-cars/rent-a-car.service';

@Component({
  selector: 'app-flight-reservation-item',
  templateUrl: './flight-reservation-item.component.html',
  styleUrls: ['./flight-reservation-item.component.css']
})
export class FlightReservationItemComponent implements OnInit {

  @Input() flightReservation:FlightReservation;
  flight:Flight;
  company:Airline;
  closeResult = '';
  car:Car;
  rentalCompany:RentCar;
  constructor(private airlineService:AirlineService, private modalService: NgbModal, private rentCarService:RentCarService) { }

  ngOnInit(): void {
    this.flight = this.airlineService.getAirline(this.flightReservation.companyID).flights.find(c=>c.id==this.flightReservation.flightID);
    this.company = this.airlineService.getAirline(this.flightReservation.companyID);
    var i = 0;
    if(this.flightReservation.carReservation.length>0){
        this.rentalCompany=this.rentCarService.getRentCarCompany(this.flightReservation.carReservation[0].companyId);
    }
    
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
