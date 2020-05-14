import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentCarService } from '../../../services/rent-a-car.service';
import { Car } from 'src/app/models/Car.model';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CarReservation } from 'src/app/models/carReservation.model';
import { UserService } from 'src/app/services/userService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cars-cards',
  templateUrl: './cars-cards.component.html',
  styleUrls: ['./cars-cards.component.css']
})

export class CarsCardsComponent implements OnInit,OnDestroy {

  @Input('cars') cars:Car[];
  searched:boolean=false;
  searchParamsSubscription:Subscription;
  params:{};
  currentCar:Car;
  rentDays:number;
  closeResult: string;

  constructor(private route:ActivatedRoute,private rentCarsService:RentCarService,private usersService:UserService,private modalService: NgbModal){}

  ngOnInit(){

      this.searchParamsSubscription = this.rentCarsService.searchCarsParamsSubject.subscribe((params:{}) =>{

      this.searched=true;
      this.params=params;
      this.cars = this.rentCarsService.getCarsSearch(params);
      this.rentDays = this.getDaysBetween(params['pickUpDate'],params['dropOffDate'])+1;

    })
  }

  ngOnDestroy(): void {
    this.searchParamsSubscription.unsubscribe();
  }

  getDaysBetween(start:string,end:string):number{

    const ONE_DAY = 1000 * 60 * 60 * 24;

    var startParts = start.split('-');
    var endParts = end.split('-');

    var date1 = new Date(+startParts[2],+startParts[1]-1,+startParts[0]);
    var date2 = new Date(+endParts[2],+endParts[1]-1,+endParts[0]);

    const diffDays = Math.round(Math.abs((+date1 - +date2) / ONE_DAY));
    return diffDays;
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
    let daysBetween = this.getDaysBetween(pickUpDate,dropOffDate);
    let totalPrice = this.currentCar.pricePerDay * daysBetween;

    let carReservation = new CarReservation(pickUpDate,pickUpTime,dropOffDate,dropOffTime,daysBetween,totalPrice,this.currentCar.companyId,this.currentCar.companyName,this.currentCar.id,'',this.currentCar.model);

    if(this.usersService.makeCarReservation(carReservation)){
      Swal.fire({
        text: 'Reservation successfully made!',
        icon: 'success',
        showConfirmButton: false,
        timer:1500,
      })
    }

  }

}
