import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { UserService } from 'src/app/services/user-service.service';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CarReservation } from 'src/app/models/car-reservation.model';
import Swal from 'sweetalert2';
import { CarReservationsService } from 'src/app/services/car-reservations.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {

  @Input('car') car:Car;
  @Input('daysBetween')daysBetween:number;
  @Input('params')params:{};
  closeResult:string;


  isUserLogged:boolean;
  constructor(private carReservationsService:CarReservationsService,private usersService:UserService,private modalService: NgbModal){}


  ngOnInit(): void {
    this.isUserLogged = this.usersService.isUserLoggedIn();
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
      return  `with: ${reason}`;
    }
  }

  makeReservation():void{

    let data ={
      'pickUpDate' : this.changeDateFormat(this.params['pickUpDate']) + " " + this.params['pickUpTime'],
      'dropOffDate' : this.changeDateFormat(this.params['dropOffDate']) + " " + this.params['dropOffTime'],
      'carId' : this.car.id,
      'pricePerDay' : this.car.price
    }

    this.carReservationsService.makeCarReservation(data).subscribe(
      ret=>{
        Swal.fire({
              text: 'Reservation successfully made!',
              icon: 'success',
              showConfirmButton: false,
              timer:1500,
            })
      },
      err=>{
        Swal.fire({
          title: 'Reservation making failed.',
          text:err.error.message,
          icon: 'error',
          showConfirmButton: false,
          timer:1500,
        })
      }
    )
  }

  changeDateFormat(date:string):string{
    let dateParts = date.split('-');
    let day = dateParts[0];
    let month = dateParts[1];
    let year = dateParts[2];

    return month + '-' + day + '-' +year;
  }

}
