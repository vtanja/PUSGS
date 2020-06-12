import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  NgbDate,
  NgbCalendar,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { fadeIn } from 'igniteui-angular';
import { CarService } from 'src/app/services/car.service';
import { CarAdapter } from 'src/app/models/adapters/car.adapter';
import { NgxSpinnerService } from 'ngx-spinner';
import { DiscountDateService } from 'src/app/services/discount-date.service';

@Component({
  selector: 'app-cars-edit',
  templateUrl: './cars-edit.component.html',
  styleUrls: ['./cars-edit.component.css'],
})
export class CarsEditComponent implements OnInit {
  cars: Car[];
  currentCar: Car;
  closeResult: string;
  changePriceForm: FormGroup;
  addDiscountForm: FormGroup;

  hoveredDate: NgbDate | null = null;
  datesSelected: string[] = [];

  isLoading: boolean;

  disabled: NgbDate[];
  alreadyOnDiscount: [any];
  datesToRemove: number[] = [];

  constructor(
    private carService: CarService,
    private carAdapter: CarAdapter,
    private modalService: NgbModal,
    private config: NgbDatepickerConfig,
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService,
    private discountDateService: DiscountDateService
  ) {
    this.changePriceForm = new FormGroup({
      newPrice: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
    this.addDiscountForm = new FormGroup({
      discount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
    });
  }

  ngOnInit(): void {
    this.showLoader();
    this.carService.getCompanyCars().subscribe(
      (res: any) => {
        this.cars = res;
        this.hideLoader();
      },
      (err) => {
        this.hideLoader();
      }
    );
  }

  openChangePrice(content) {
    this.changePriceForm.patchValue({
      newPrice: null,
    });
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title-cpm' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openRemoveDiscount(content) {
    this.clearDates();

    this.discountDateService.getCarDiscountDates(this.currentCar.id).subscribe(
      (res: any) => {
        this.alreadyOnDiscount = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title-adm' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openAddDiscount(content) {
    this.clearDates();

    this.discountDateService.getCarDiscountDates(this.currentCar.id).subscribe(
      (res: any) => {
        this.alreadyOnDiscount = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title-adm' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openDeleteCar(content) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private clearDates(): void {
    this.addDiscountForm.reset();
    this.datesSelected = [];
    this.datesToRemove = [];
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

  changePrice(): void {
    let oldPrice = this.currentCar.price;
    let newPrice = this.changePriceForm.get('newPrice').value;
    this.currentCar.price = newPrice;
    this.spinner.show();
    this.carService
      .changeCarPrice(this.currentCar.id, this.currentCar)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          Swal.fire({
            text: 'Price successfully changed!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });

          let carChanged = this.carAdapter.adapt(res);
          let index = this.cars.findIndex((c) => c.id === res.id);
          this.cars[index] = carChanged;
        },
        (err) => {
          this.spinner.hide();
          this.currentCar.price = oldPrice;
          Swal.fire({
            text: err.errors.message,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: '#fa9e1c',
            timer: 1500,
          });
        }
      );
  }

  getDiscountPrice(): number {
    if (this.addDiscountForm.valid) {
      let discount = this.addDiscountForm.get('discount').value;
      return +((this.currentCar.price * (100 - discount)) / 100).toFixed(2);
    } else {
      return -1;
    }
  }

  addDiscount(): void {
    let data = {
      Dates: this.datesSelected,
      CarId: this.currentCar.id,
      Discount: this.addDiscountForm.get('discount').value,
    };

    this.spinner.show();
    this.discountDateService.addDiscountDates(data).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.success) {
          Swal.fire({
            text: res.success,
            icon: 'success',
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          data.Dates = res.conflictDates;

          Swal.fire({
            text: res.conflictDatesStr,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, override!',
            cancelButtonText: 'No, leave!',
            confirmButtonColor: '#fa9e1c',
            cancelButtonColor: '#31124b',
            icon: 'warning',
          }).then((result) => {
            if (result.value) {
              this.spinner.show();
              this.discountDateService.overrideDiscount(data).subscribe(
                (res: any) => {
                  this.spinner.hide();
                  Swal.fire({
                    text: 'New discount successfully applied to all dates.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500,
                  });
                },
                (err) => {
                  this.spinner.hide();
                }
              );
            }
          });
        }
        this.clearDates();
      },
      (err) => {
        this.spinner.hide();
        this.clearDates();
      }
    );
  }

  removeDiscount(): void {
    console.log(this.datesToRemove);
    this.spinner.show();
    let data = '';
    for (let i in this.datesToRemove) {
      console.log(this.datesToRemove[i]);
      data += this.datesToRemove[i] + ';';
    }
    console.log(data);
    this.discountDateService.removeDiscountDates(data).subscribe(
      (res: any) => {
        this.spinner.hide();
        Swal.fire({
          text: 'Discount successfully removed from selected dates.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
      },
      (err) => {
        this.spinner.hide();
        if (err.message) {
          Swal.fire({
            text: err.message,
            icon: 'error',
            showConfirmButton: true,
          });
        } else {
          console.log(err);
        }
      }
    );
  }

  deleteCar(car: Car): void {
    Swal.fire({
      text:
        'Are you sure you want to remove ' +
        car.brand +
        ' ' +
        car.model +
        ' from your company ?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#fa9e1c',
      cancelButtonColor: '#31124b',
      icon: 'warning',
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.carService.deleteCar(car.id).subscribe((res) => {
          this.spinner.hide();
          Swal.fire({
            text: 'Car successfully deleted!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });

          this.updateCarsAfterDelete(car);

          (err) => {
            this.spinner.hide();
          };
        });
      }
    });
  }

  carsEmpty(): boolean {
    return this.cars === undefined || this.cars.length === 0;
  }

  updateCarsAfterDelete(car: Car) {
    let index = this.cars.indexOf(car);
    this.cars.splice(index, 1);
  }

  isInside(date: NgbDate) {
    let strdate = this.dateToString(date);
    return this.datesSelected.find((x) => x == strdate) ? 'selected' : null;
  }

  isAlreadyOnDiscount(date: NgbDate) {
    let strdate = this.dateToStr(date);
    if (this.alreadyOnDiscount != undefined) {
      let found = this.alreadyOnDiscount.find((d) => d.date === strdate);
      if (found === undefined) return null;
      return found.discount;
    }
    return null;
  }

  getAlreadyOnDiscountId(date: NgbDate) {
    let strdate = this.dateToStr(date);
    let found = this.alreadyOnDiscount.find((d) => d.date === strdate);
    if (found === undefined) return null;
    return found.id;
  }

  onRemoveDate(date: NgbDate) {
    let strdate = this.dateToString(date);

    let id = this.getAlreadyOnDiscountId(date);
    console.log(id);
    if (id != null) {
      const index = this.datesSelected.findIndex((x) => x == strdate);
      const indexId = this.datesToRemove.findIndex((x) => x === id);
      if (index < 0) {
        this.datesSelected.push(this.dateToString(date));
        this.datesToRemove.push(id);
      } else {
        this.datesSelected.splice(index, 1);
        this.datesToRemove.splice(indexId, 1);
      }
    }
  }

  onSelectDate(date: NgbDate) {
    let strdate = this.dateToString(date);

    const index = this.datesSelected.findIndex((x) => x == strdate);
    if (index < 0) this.datesSelected.push(this.dateToString(date));
    else this.datesSelected.splice(index, 1);
  }

  showLoader() {
    this.isLoading = true;
    this.spinner.show();
  }

  hideLoader() {
    this.spinner.hide();
    this.isLoading = false;
  }

  dateToString(date: NgbDate) {
    return date.day + '/' + date.month + '/' + date.year;
  }

  dateToStr(date: NgbDate) {
    let day = date.day<10?"0"+date.day:date.day;
    return (
      day +
      '-' +
      this.getMonth(date.month) +
      '-' +
      date.year.toString().substr(2, 2)
    );
  }

  getMonth(num: number): string {
    switch (num) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
    }
  }
}
