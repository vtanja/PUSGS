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
import { FlightsComponent } from './airlines/flights/flights.component';
import { RentACarProfileComponent } from './rent-a-cars/rent-a-car-profile/rent-a-car-profile.component';
import { CarsComponent } from './rent-a-cars/cars/cars.component';


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
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'allCarCompanies',component: RentACarsComponent},
  {path:'carProfile/:id',component: RentACarProfileComponent},
  {path: 'allCars',component: CarsComponent},
  {path: 'navbar', component:NavbarComponent },
  {path: 'carProfile', component:RentACarProfileComponent},
  {path: 'allAirlineCompanies', component:AirlinesComponent},
  {path: 'allFlights', component:FlightsComponent},
  {path: '**',component:HomePageComponent}
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
