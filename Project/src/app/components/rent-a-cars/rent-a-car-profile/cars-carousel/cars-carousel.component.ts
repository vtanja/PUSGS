import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { RentCarService } from '../../../../services/rent-a-car.service';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/Car.model';

@Component({
  selector: 'app-cars-carousel',
  templateUrl: './cars-carousel.component.html',
  styleUrls: ['./cars-carousel.component.css']
})
export class CarsCarouselComponent implements OnInit{

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;


  @Input('carCompany') carCompany:RentCar;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  constructor(private route:ActivatedRoute,private rentCarsService:RentCarService){}

  ngOnInit(){}

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}

