import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CarReservation } from 'src/app/models/car-reservation.model';
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
  closeResult: string;
  toRate:string;
  closeModalSubscription:Subscription;

  constructor(private carsReservationsService:CarReservationsService, private rentCarService:RentCarService,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.closeModalSubscription = this.carsReservationsService.ratingModalClose.subscribe((data:any)=>{
      if(data.company){
        this.reservation.companyRate=data.rate;
      }else if(data.car){
        this.reservation.carRate = data.rate;
      }
      this.modalService.dismissAll();
    })

  }

  ngOnDestroy():void{
    this.closeModalSubscription.unsubscribe();
  }

  open(content,rateItem) {

    this.toRate = rateItem

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered:true}).result.then((result) => {
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
