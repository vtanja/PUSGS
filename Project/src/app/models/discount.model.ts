import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class Discount{
  date:NgbDate;
  price:number;

  constructor(date:NgbDate,price:number){
    this.date=date;
    this.price=price;
  }
}
