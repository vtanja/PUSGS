import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './header/carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { RentACarsComponent } from './rent-a-cars/rent-a-cars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2TelInputModule} from 'ng2-tel-input';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { MatSortModule } from '@angular/material/sort';
import { RentACarListComponent } from './rent-a-cars/rent-a-car-list/rent-a-car-list.component';
import { RentACarItemComponent } from './rent-a-cars/rent-a-car-item/rent-a-car-item.component';
import { CarsSearchComponent } from './rent-a-cars/cars-search/cars-search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RentACarSearchComponent } from './rent-a-cars/rent-a-car-search/rent-a-car-search.component';
import { RentCarService } from './rent-a-cars/rent-a-car.service';
import { CarsListComponent } from './rent-a-cars/cars/cars-list/cars-list.component';
import { CarItemComponent } from './rent-a-cars/cars/car-item/car-item.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FriendsListComponent } from './user/friends-list/friends-list.component';
import { SearchPipe } from './user/friends-list/search.pipe';
import { UserService } from './user/userService.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsSearchFormComponent } from './rent-a-cars/cars-search/cars-search-form/cars-search-form.component';
import { CarsComponent } from './rent-a-cars/cars/cars.component';
import { AirlinesListComponent } from './airlines/airlines-list/airlines-list.component';
import { AirlineItemComponent } from './airlines/airline-item/airline-item.component';
import { AirlineService } from './airlines/airline.service';
import { FlightListComponent } from './airlines/flights/flight-list/flight-list.component';
import { FlightItemComponent } from './airlines/flights/flight-item/flight-item.component';
import { FlightsComponent } from './airlines/flights/flights.component';
import { RoundFlightItemComponent } from './airlines/flights/round-flight-item/round-flight-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HeaderComponent,
    LoginComponent,
    HomePageComponent,
    RegisterComponent,
    AirlinesComponent,
    RentACarsComponent,
    UserProfileComponent,
    FriendsListComponent,
    SearchPipe,
    RentACarListComponent,
    RentACarItemComponent,
    CarsSearchComponent,
    RentACarSearchComponent,
    UserComponent,
    NavbarComponent,
    CarsListComponent,
    CarItemComponent,
    CarsSearchFormComponent,
    CarsComponent,
    AirlinesListComponent,
    AirlineItemComponent,
    FlightListComponent,
    FlightItemComponent,
    FlightsComponent,
    RoundFlightItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2TelInputModule,
    ShowHidePasswordModule,
    Ng2SearchPipeModule,
    MatSortModule
  ],
  providers: [
    UserService,
    RentCarService,
    AirlineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
