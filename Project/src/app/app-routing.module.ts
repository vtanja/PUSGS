import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { RentACarsComponent } from './rent-a-cars/rent-a-cars.component';
import { CarsSearchComponent } from './rent-a-cars/cars-search/cars-search.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FriendsListComponent } from './user/friends-list/friends-list.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AirlinesListComponent } from './airlines/airlines-list/airlines-list.component';
import {FlightsSearchComponent} from './airlines/flights-search/flights-search.component'
import { FlightListComponent } from './airlines/flights/flight-list/flight-list.component';
import { RentACarProfileComponent } from './rent-a-cars/rent-a-car-profile/rent-a-car-profile.component';
import { CarsComponent } from './rent-a-cars/cars/cars.component';
import { FlightsComponent } from './airlines/flights/flights.component';
import { AirlineProfileComponent } from './airlines/airline-profile/airline-profile.component';
import { ReservationsComponent } from './user/reservations/reservations.component';
import { CarReservationListComponent } from './user/reservations/car-reservation-list/car-reservation-list.component';
import { FlightReservationListComponent } from './user/reservations/flight-reservation-list/flight-reservation-list.component';
import { RentACarEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/rent-a-car-edit.component';


const routes: Routes = [
  {path: '', component:HomePageComponent, pathMatch:'full'},
  {path: 'home', component: HomePageComponent,
    children:[
      {path: 'search-cars', component:CarsSearchComponent},
      {path: 'search-flights', component:FlightsSearchComponent}
    ]},
  {path: 'user', component: UserComponent,
    children:[
      {path: 'profile', component:UserProfileComponent},
      {path: 'friends', component:FriendsListComponent},
      {path: 'reservations', component:ReservationsComponent,
        children:[
          {path: 'car-reservations', component:CarReservationListComponent},
          {path: 'flight-reservations', component:FlightReservationListComponent},
        ]},
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'allCarCompanies',component: RentACarsComponent},
  {path: 'allAirlineCompanies', component:AirlinesComponent},
  {path: 'allCars',component: CarsComponent},
  {path: 'allFlights', component:FlightsComponent},
  {path: 'navbar', component:NavbarComponent },
  {path:'carProfile/:id',component: RentACarProfileComponent},
  {path:'airlineProfile/:id',component: AirlineProfileComponent},
  {path:'editService',component:RentACarEditComponent},
  {path: '**',component:HomePageComponent}
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
   scrollOffset: [0, 24],
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
