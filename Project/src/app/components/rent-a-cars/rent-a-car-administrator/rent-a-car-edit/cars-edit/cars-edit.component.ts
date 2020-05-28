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
import { CarService } from 'src/app/services/car.service';
import { CarAdapter } from 'src/app/models/adapters/car.adapter';
import { NgxSpinnerService } from 'ngx-spinner';

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

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  selectedDates:boolean;
  isLoading:boolean;

  constructor(private carService:CarService, private carAdapter:CarAdapter,
    private modalService: NgbModal,private config: NgbDatepickerConfig,
    private calendar: NgbCalendar,private spinner: NgxSpinnerService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.changePriceForm = new FormGroup({
      'newPrice':new FormControl(null,[Validators.required,Validators.min(1)])
    });
    this.addDiscountForm = new FormGroup({
      'discount':new FormControl(null,[Validators.required,Validators.min(1),Validators.max(100)])
    })
  }

  ngOnInit(): void {
    this.showLoader();
    this.carService.getCompanyCars().subscribe(
      (res:any)=>{
        this.cars = res;
        this.hideLoader();
      },
      (err)=>{
        this.hideLoader();
      }
    )


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
    let newPrice = this.changePriceForm.get('newPrice').value;
    this.spinner.show();
    this.carService.changeCarPrice(this.currentCar.id,newPrice).subscribe(
      (res:any) => {
        this.spinner.hide();
        Swal.fire({
          text: 'Price successfully changed!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });

      let carChanged = this.carAdapter.adapt(res);
      let index = this.cars.findIndex(c=>c.id === res.id);
      this.cars[index] = carChanged;

      },
      err => {
        this.spinner.hide();
        Swal.fire({
          text: err.errors.message,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#fa9e1c',
          timer: 1500
        });

      }
     )
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
    // if(this.rentCarAdminService.addDiscount(this.companyId,this.currentCar.id,this.fromDate,this.toDate,this.getDiscountPrice())){
    //   Swal.fire({
    //     text: 'Discount successfully added!',
    //     icon: 'success',
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    // }
  }

  deleteCar(car:Car):void{

    Swal.fire({
      text: 'Are you sure you want to remove ' +  car.brand + ' ' + car.model + ' from your company ?',
      showCancelButton :true,
      showConfirmButton :true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#fa9e1c',
      cancelButtonColor: '#31124b',
      icon: "warning",

    }).then((result)=>{
      if(result.value){

        this.spinner.show();
        this.carService.deleteCar(car.id).subscribe(
          (res)=>{

          this.spinner.hide();
          Swal.fire({
            text: 'Car successfully deleted!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });

          this.updateCarsAfterDelete(car);

          (err)=>{
            this.spinner.hide();
          }

        })
      }
  });
  }


  carsEmpty():boolean{
    return (this.cars===undefined ||  this.cars.length ===0);
  }

  updateCarsAfterDelete(car:Car){
    let index = this.cars.indexOf(car);
    this.cars.splice(index,1);
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

  showLoader(){
    this.isLoading = true;
    this.spinner.show();
  }

  hideLoader(){
    this.spinner.hide();
    this.isLoading = false;
  }

}
