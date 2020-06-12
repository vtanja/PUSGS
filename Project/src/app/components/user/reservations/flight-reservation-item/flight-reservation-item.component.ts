import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FlightReservation } from 'src/app/models/flight-reservation.model';
import { Flight } from 'src/app/models/flight.model';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-flight-reservation-item',
  templateUrl: './flight-reservation-item.component.html',
  styleUrls: ['./flight-reservation-item.component.css']
})
export class FlightReservationItemComponent implements OnInit,OnDestroy, AfterViewInit {

  @Input() flightReservation:FlightReservation;

  closeResult = '';

  toRate:string;
  canRate:boolean;
  modalCloseSubscription:Subscription;
  private readonly image = '../../../../../assets/images/airlines/';
  imgToDisplay:string;
  imgToDisplay2:string;

  constructor(private airlineService:AirlineService, private modalService: NgbModal, private rentCarService:RentCarService, private router:Router, private flightReservationService:FlightReservationService) { }

  ngAfterViewInit(): void {
    this.airlineService.getAirline(this.flightReservation.flights[0].plane.airlineId).subscribe((res:any)=>{
      this.imgToDisplay = this.image + res.image;
      console.log(res.image);
    });

    if(this.flightReservation.flights[1]!==undefined){
      this.airlineService.getAirline(this.flightReservation.flights[1].plane.airlineId).subscribe((res:any)=>{
        this.imgToDisplay2 = this.image + res.image;
        console.log(res.image);
      });
    }
  }

  ngOnInit(): void {


    // this.modalCloseSubscription = this.flightReservationService.rateModalClose.subscribe((data:any)=>{
    //   if(data.airline){
    //   //  this.flightReservation.airlineRate=data.rate;
    //   }else if(data.car){
    //    // this.flightReservation.flightRate = data.rate;
    //   }
    //   this.modalService.dismissAll();
    // })

    var i = 0;
    var today = new Date();

    //var dateParts = this.flight.landingDate.split('-');
    //var timeParts = this.flight.landingTime.split(':');
    //var landingDate = new Date(+dateParts[2],+dateParts[1]-1,+dateParts[0],+timeParts[0],+timeParts[1],0);

    // if(landingDate<=today)
    //   this.canRate = true;


  }

  ngOnDestroy():void{
    //this.modalCloseSubscription.unsubscribe();
  }

  openRateModal(content,rateItem) {

    this.toRate = rateItem

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered:true}).result.then((result) => {
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

  cancelReservation(){
    var currentMoment = new Date();
    currentMoment.setHours(currentMoment.getHours()-1);
    console.log('current moment: ',currentMoment);
    var parts=this.flightReservation.flights[0].takeOffDate.split('-');
    console.log(parts);
    var timeParts = this.flightReservation.flights[0].takeOffTime.split(':');
    var takeOff = new Date(+parts[2], +parts[1]-1, +parts[0], +timeParts[0], +timeParts[1]);
    console.log('take off: ', takeOff);

    var duration = (takeOff.getTime()-currentMoment.getTime())/1000/60/60;
    console.log('duration: ', duration);

    if(duration>=3){
      this.flightReservationService.cancelReservation(this.flightReservation).subscribe((res:any)=>{
        Swal.fire({
          text: 'Successfully canceled reservation',
          icon: 'success',
          showConfirmButton: false,
          timer:1500
        }).then(()=>{
          this.router.navigate(['/user/reservations/flight-reservations']);
        })
      },
      (err)=>{
        Swal.fire({
          text: err.error.message,
          icon: 'error',
          showConfirmButton: true
        })
      })
    }
    else{
      Swal.fire({
        text: 'It is possible to cancel reservation only 3 hours before departure time!',
        icon: 'warning',
        showConfirmButton: true
      })
    }


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
