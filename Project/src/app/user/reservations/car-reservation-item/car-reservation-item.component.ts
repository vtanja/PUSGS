import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CarReservation } from 'src/app/models/carReservation.model';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { CarReservationsService } from 'src/app/services/car-reservations.service';

@Component({
  selector: 'app-car-reservation-item',
  templateUrl: './car-reservation-item.component.html',
  styleUrls: ['./car-reservation-item.component.css']
})
export class CarReservationItemComponent implements OnInit,OnDestroy {

  @Input('reservation') reservation:CarReservation;
  car:Car;
  company:RentCar;
  canRate:boolean;
  closeResult: string;
  toRate:string;
  closeModalSubscription:Subscription;

  constructor(private carsReservationsService:CarReservationsService, private rentCarService:RentCarService,private modalService: NgbModal) { }

  ngOnInit(): void {

    console.log(this.reservation);

    this.car = this.rentCarService.getRentCarCompany(this.reservation.companyId).cars.find(c=>c.id==this.reservation.carId);
    this.company = this.rentCarService.getRentCarCompany(this.reservation.companyId);
    this.closeModalSubscription = this.carsReservationsService.ratingModalClose.subscribe(()=>{
      this.modalService.dismissAll();
    })

    var today = new Date();

    var dateParts = this.reservation.returnDate.split('-');
    var timeParts = this.reservation.returnTime.split(':');
    var returnDate = new Date(+dateParts[2],+dateParts[1]-1,+dateParts[0],+timeParts[0],+timeParts[1],0);

    if(returnDate<=today)
      this.canRate = true;

  }

  ngOnDestroy():void{
    this.closeModalSubscription.unsubscribe();
  }

  open(content,rateItem) {

    this.toRate = rateItem

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
      return  `with: ${reason}`;
    }
  }

}
