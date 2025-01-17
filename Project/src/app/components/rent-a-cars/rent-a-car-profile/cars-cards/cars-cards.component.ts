import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentCarService } from '../../../../services/rent-a-car.service';
import { Car } from 'src/app/models/Car.model';
import { Subscription, Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CarService } from 'src/app/services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';

@Component({
  selector: 'app-cars-cards',
  templateUrl: './cars-cards.component.html',
  styleUrls: ['./cars-cards.component.css'],
})
export class CarsCardsComponent implements OnInit, OnDestroy {
  @Input('cars') cars: Car[];
  @Input('quickReservationInput') quickResInput: any;
  searched: boolean = false;
  searchParamsSubscription: Subscription;
  params: {};
  currentCar: Car;
  rentDays: number;
  closeResult: string;
  notFlightRes: boolean = true;
  isSpining: boolean = false;
  carReserved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentCarsService: RentCarService,
    private carService: CarService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private carReservationsService: CarReservationsService,
    private flightReservationService: FlightReservationService
  ) {}

  ngOnInit() {
    this.carReserved = false;

    this.searchParamsSubscription = this.rentCarsService.searchCarsParamsSubject.subscribe(
      (queryParams: '') => {
        this.searched = true;
        this.params = queryParams;
        this.rentDays =
          this.getDaysBetween(
            queryParams['pickUpDate'],
            queryParams['dropOffDate']
          ) + 1;

        let httpParams =
          'pickUpLocation=' +
          queryParams['pickUpLocation'] +
          '&dropOffLocation=' +
          queryParams['dropOffLocation'] +
          '&pickUpDate=' +
          queryParams['pickUpDate'] +
          '&dropOffDate=' +
          queryParams['dropOffDate'] +
          '&passsengers=' +
          queryParams['passsengers'] +
          '&brand=' +
          queryParams['carBrand'] +
          '&companyID=' +
          queryParams['companyID'];

        this.showSpinner();
        this.carService.searchCompanyCars(httpParams).subscribe(
          (res) => {
            this.cars = res;
            this.hideSpinner();
          },
          (err) => {
            if (err.status === 404) {
              this.cars = [];
            }
            this.hideSpinner();
          }
        );
      }
    );

    if (this.route.snapshot.routeConfig.path.includes('create-reservation')) {
      this.notFlightRes = false;
    }

    console.log(this.cars);
  }

  ngOnDestroy(): void {
    this.searchParamsSubscription.unsubscribe();
  }

  getDaysBetween(start: string, end: string): number {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    var startParts = start.split('-');
    var endParts = end.split('-');

    var date1 = new Date(+startParts[2], +startParts[1] - 1, +startParts[0]);
    var date2 = new Date(+endParts[2], +endParts[1] - 1, +endParts[0]);

    const diffDays = Math.round(Math.abs((+date1 - +date2) / ONE_DAY));
    return diffDays;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  makeReservation(): void {
    let data = {
      pickUpDate:
        this.changeDateFormat(this.params['pickUpDate']) +
        ' ' +
        this.params['pickUpTime'],
      dropOffDate:
        this.changeDateFormat(this.params['dropOffDate']) +
        ' ' +
        this.params['dropOffTime'],
      pricePerDay: this.currentCar.price,
      carId: this.currentCar.id,
    };

    this.carReservationsService.makeCarReservation(data).subscribe(
      (ret) => {
        Swal.fire({
          text: 'Reservation successfully made!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2300,
        });

        this.router.navigateByUrl('/user/reservations/car-reservations');
      },
      (err) => {
        Swal.fire({
          title: 'Reservation making failed.',
          text: err.error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      }
    );
  }

  makeQuickReservation(): void {
    let data = {
      pickUpDate: this.changeDateFormat(this.quickResInput.pickUpDate),
      dropOffDate: this.changeDateFormat(this.quickResInput.dropOffDate),
      carId: this.currentCar.id,
      totalPrice: this.currentCar.price,
    };

    this.flightReservationService.setPendingCarReservation(data);
    this.carReserved = true;
  }

  showSpinner() {
    this.isSpining = true;
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
    this.isSpining = false;
  }

  changeDateFormat(date: string): string {
    let dateParts = date.split('-');
    let day = +dateParts[0];
    let month = +dateParts[1];
    let year = +dateParts[2];

    return month + '-' + day + '-' + year;
  }
}
