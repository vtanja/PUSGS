import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars-edit',
  templateUrl: './cars-edit.component.html',
  styleUrls: ['./cars-edit.component.css']
})
export class CarsEditComponent implements OnInit {

  @Input('companyId')companyId;
  cars:Car[]
  currentCar:Car;
  closeResult: string;
  changePriceForm:FormGroup;

  constructor(private rentCarService:RentCarService,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.cars = this.rentCarService.getCompanyCars(this.companyId);
    this.changePriceForm = new FormGroup({
      'newPrice':new FormControl(null,Validators.required)
    });
  }

  open(content) {

    this.changePriceForm.patchValue({
      'newPrice':null
    })
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

   changePrice(){
     var newPrice = +this.changePriceForm.get('newPrice').value;
     if (this.rentCarService.changeCarPrice(this.companyId,this.currentCar.id,newPrice))
      this.cars.find(c=>c.id===this.currentCar.id).pricePerDay=newPrice

    console.log(this.cars);
   }

}
