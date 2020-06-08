import { Component, OnInit } from '@angular/core';
import { BonusPointDiscount } from 'src/app/models/bonus-point-discount.model';
import { BonusPointsDiscountService } from 'src/app/services/bonus-points-discount.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { text } from '@fortawesome/fontawesome-svg-core';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-bonus-points',
  templateUrl: './bonus-points.component.html',
  styleUrls: ['./bonus-points.component.css']
})
export class BonusPointsComponent implements OnInit {

  bonusPoints:BonusPointDiscount[];
  discountsForm:FormGroup;

  constructor(private bonusPointsService:BonusPointsDiscountService) {
    this.discountsForm = new FormGroup({
      'firstDiscount': new FormControl("",[Validators.required,Validators.min(0),Validators.max(99)]),
      'secondDiscount': new FormControl("",[Validators.required,Validators.min(0),Validators.max(99)]),
      'thirdDiscount': new FormControl("",[Validators.required,Validators.min(0),Validators.max(99)]),
      'fourthDiscount': new FormControl("",[Validators.required,Validators.min(0),Validators.max(99)]),
    })
  }

  ngOnInit(): void {
    this.bonusPointsService.getAllBonusPointsDiscounts().subscribe(
      res=>{
        this.bonusPoints = res;
        this.patchFormValues();
      },
      err=>{
        console.log(err);
      }
    );
  }

  patchFormValues(){
    this.discountsForm.patchValue({
      "firstDiscount" : this.bonusPoints[0].Discount,
      "secondDiscount" : this.bonusPoints[1].Discount,
      "thirdDiscount" : this.bonusPoints[2].Discount,
      "fourthDiscount" : this.bonusPoints[3].Discount,
    })
  }

  onSave(){
    this.getValues();
    this.bonusPointsService.updateBonusPointsDiscounts(this.bonusPoints).subscribe(
      res=>{
        Swal.fire({
          text :'Discounts succesfully updated',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
         })
      },
      err=>{
        this.discountsForm.reset();
        console.log(err);
      }
    )
  }

  getValues(){
    this.bonusPoints[0].Discount = +this.discountsForm.get('firstDiscount').value;
    this.bonusPoints[1].Discount = +this.discountsForm.get('secondDiscount').value;
    this.bonusPoints[2].Discount = +this.discountsForm.get('thirdDiscount').value;
    this.bonusPoints[3].Discount = +this.discountsForm.get('fourthDiscount').value;
  }
}
