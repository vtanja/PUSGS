import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { UserService } from 'src/app/services/user-service.service';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CarReservation } from 'src/app/models/car-reservation.model';
import Swal from 'sweetalert2';

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
  constructor(private rentCarsService:RentCarService,private usersService:UserService,private modalService: NgbModal){}


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

    let pickUpDate = this.params['pickUpDate'];
    let pickUpTime = this.params['pickUpTime'];
    let dropOffDate = this.params['dropOffDate'];
    let dropOffTime = this.params['dropOffTime'];
    let daysBetween = this.daysBetween;
    let totalPrice = this.car.price * daysBetween;

    let carReservation = new CarReservation(pickUpDate,pickUpTime,dropOffDate,dropOffTime,daysBetween,totalPrice,this.car.companyId,this.car.companyName,this.car.id,'',this.car.model);

    // if(this.usersService.makeCarReservation(carReservation)){
    //   Swal.fire({
    //     text: 'Reservation successfully made!',
    //     icon: 'success',
    //     showConfirmButton: false,
    //     timer:1500,
    //   })
    // }

  }



}
