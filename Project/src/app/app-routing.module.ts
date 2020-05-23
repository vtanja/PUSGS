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
import { FlightsSearchComponent } from './airlines/flights-search/flights-search.component';
import { FlightListComponent } from './airlines/flights/flight-list/flight-list.component';
import { RentACarProfileComponent } from './rent-a-cars/rent-a-car-profile/rent-a-car-profile.component';
import { CarsComponent } from './rent-a-cars/cars/cars.component';
import { FlightsComponent } from './airlines/flights/flights.component';
import { AirlineProfileComponent } from './airlines/airline-profile/airline-profile.component';
import { ReservationsComponent } from './user/reservations/reservations.component';
import { CarReservationListComponent } from './user/reservations/car-reservation-list/car-reservation-list.component';
import { FlightReservationListComponent } from './user/reservations/flight-reservation-list/flight-reservation-list.component';
import { RentACarEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/rent-a-car-edit.component';
import { CreateFlightReservationComponent } from './create-flight-reservation/create-flight-reservation.component';
import { CreateCarReservationComponent } from './create-car-reservation/create-car-reservation.component';
import { MainDataEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/main-data-edit/main-data-edit.component';
import { CarsEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/cars-edit/cars-edit.component';
import { OfficesEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/offices-edit/offices-edit.component';
import { AddCarComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/add-car/add-car.component';
import { AirlineEditComponent } from './airlines/airline-administrator/airline-edit/airline-edit.component';
import { EditAirlineMainDataComponent } from './airlines/airline-administrator/airline-edit/edit-airline-main-data/edit-airline-main-data.component';
import { EditDestinationsComponent } from './airlines/airline-administrator/airline-edit/edit-destinations/edit-destinations.component';
import { PlanesComponent } from './airlines/airline-administrator/airline-edit/planes/planes.component';
import { EditPlaneComponent } from './airlines/airline-administrator/airline-edit/planes/edit-plane/edit-plane.component';
import { AddPlaneComponent } from './airlines/airline-administrator/airline-edit/planes/add-plane/add-plane.component';
import { AdminFlightListComponent } from './airlines/airline-administrator/airline-edit/admin-flights/admin-flight-list/admin-flight-list.component';
import { AddFlightComponent } from './airlines/airline-administrator/airline-edit/admin-flights/add-flight/add-flight.component';
import { AdminFlightsComponent } from './airlines/airline-administrator/airline-edit/admin-flights/admin-flights.component';
import { AddUserComponent } from './administrator/add-user/add-user.component';
import { RentCarAdminsComponent } from './administrator/rent-car-admins/rent-car-admins/rent-car-admins.component';
import { AirlineAdminsComponent } from './administrator/airline-admins/airline-admins/airline-admins.component';


const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: 'search-cars', component: CarsSearchComponent },
      { path: 'search-flights', component: FlightsSearchComponent },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'friends', component: FriendsListComponent },
      {
        path: 'reservations',
        component: ReservationsComponent,
        children: [
          { path: 'car-reservations', component: CarReservationListComponent },
          {
            path: 'flight-reservations',
            component: FlightReservationListComponent,
          },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'allCarCompanies', component: RentACarsComponent },
  { path: 'allAirlineCompanies', component: AirlinesComponent },
  { path: 'allCars', component: CarsComponent },
  { path: 'allFlights', component: FlightsComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'carProfile/:id', component: RentACarProfileComponent },
  { path: 'airlineProfile/:id', component: AirlineProfileComponent },
  { path: 'editService', component: RentACarEditComponent },
  {
    path: 'create-reservation/:id',
    component: CreateFlightReservationComponent,
  },
  {
    path: 'create-reservation/:id/create-car-reservation/:carid',
    component: CreateCarReservationComponent,
  },

  {
    path: 'company-data',
    component: RentACarEditComponent,
    children: [
      { path: 'edit-main-data', component: MainDataEditComponent },
      { path: 'edit-offices', component: OfficesEditComponent },
    ],
  },
  { path: 'companyCars', component: CarsEditComponent },
  { path: 'addCar', component: AddCarComponent },
  {
    path: 'airline-company-data',
    component: AirlineEditComponent,
    children: [
      {
        path: 'edit-airline-main-data',
        component: EditAirlineMainDataComponent,
      },
      { path: 'edit-destinations', component: EditDestinationsComponent },
    ]
  },
  {path:'airline-company-data', component:AirlineEditComponent, children:[
    {path:'edit-airline-main-data', component:EditAirlineMainDataComponent},
    {path:'edit-destinations', component:EditDestinationsComponent},
  ]},
  {path:'admin-flights', component:AdminFlightsComponent},
  {path:'add-flight', component:AddFlightComponent},
  {path:'planes', component:PlanesComponent},
  {path:'edit-plane/:id', component:EditPlaneComponent},
    {path:'add-plane', component:AddPlaneComponent},
  {path:'companyCars',component:CarsEditComponent},
  {path:'addCar',component:AddCarComponent},
  {path: 'rent-car-admins', component: RentCarAdminsComponent},
  {path: 'airline-admins', component: AirlineAdminsComponent},
  { path: 'add-user', component: AddUserComponent },
  { path: '**', component: HomePageComponent },

];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 24],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
