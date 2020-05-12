import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { fadeIn } from 'igniteui-angular';

@Component({
  selector: 'app-cars-edit',
  templateUrl: './cars-edit.component.html',
  styleUrls: ['./cars-edit.component.css']
})
export class CarsEditComponent implements OnInit {

  cars:Car[]
  currentCar:Car;
  closeResult: string;
  changePriceForm:FormGroup;
  addDiscountForm:FormGroup;
  companyId:number;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  selectedDates:boolean;

  constructor(private rentCarService:RentCarService,private rentCarAdminService:RentCarAdministratorService,
    private modalService: NgbModal,private config: NgbDatepickerConfig,private calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {

    this.cars = this.rentCarAdminService.getCars();
    this.companyId = this.rentCarAdminService.getCompanyId();

    this.changePriceForm = new FormGroup({
      'newPrice':new FormControl(null,[Validators.required,Validators.min(1)])
    });
    this.addDiscountForm = new FormGroup({
      'discount':new FormControl(null,[Validators.required,Validators.min(1),Validators.max(100)])
    })
  }

  openChangePrice(content) {

    this.changePriceForm.patchValue({
      'newPrice':null
    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-cpm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddDiscount(content){

    this.clearDates();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-adm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  openDeleteCar(content){

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private clearDates():void{
    this.addDiscountForm.patchValue({
      'discount':null
    })
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    this.selectedDates=true;
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

   changePrice():void{
     var newPrice = +this.changePriceForm.get('newPrice').value;
     if (this.rentCarAdminService.changeCarPrice(this.companyId,this.currentCar.id,newPrice)){
      this.cars.find(c=>c.id===this.currentCar.id).pricePerDay=newPrice;
      Swal.fire({
        text: 'Price successfully changed!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
     }

   }

   onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.selectedDates=false;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.selectedDates=true;
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.selectedDates=false;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  getDiscountPrice():number{
    if(this.addDiscountForm.valid){
      let discount = this.addDiscountForm.get('discount').value;
      return +(this.currentCar.pricePerDay*(100-discount)/100).toFixed(2);
    }else{
      return -1;
    }
  }

  addDiscount():void{
    if(this.rentCarAdminService.addDiscount(this.companyId,this.currentCar.id,this.fromDate,this.toDate,this.getDiscountPrice())){
      Swal.fire({
        text: 'Discount successfully added!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  deleteCar():void{

    if (this.rentCarAdminService.deleteCar(this.currentCar.id,this.companyId)){
      this.cars = this.rentCarService.getCompanyCars(this.companyId);
      Swal.fire({
        text: 'Car successfully deleted!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      Swal.fire({
        text: 'Unable to delete car, there are active reservations!',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: "#de8e26"
      });

    }



  }


}
