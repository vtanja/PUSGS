import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { AirlinesComponent } from './components/airlines/airlines.component';
import { RentACarsComponent } from './components/rent-a-cars/rent-a-cars.component';
import { CarsSearchComponent } from './components/rent-a-cars/cars-search/cars-search.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { FriendsListComponent } from './components/user/friends-list/friends-list.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AirlinesListComponent } from './components/airlines/airlines-list/airlines-list.component';
import { FlightsSearchComponent } from './components/airlines/flights-search/flights-search.component';
import { FlightListComponent } from './components/airlines/flights/flight-list/flight-list.component';
import { RentACarProfileComponent } from './components/rent-a-cars/rent-a-car-profile/rent-a-car-profile.component';
import { CarsComponent } from './components/rent-a-cars/cars/cars.component';
import { FlightsComponent } from './components/airlines/flights/flights.component';
import { AirlineProfileComponent } from './components/airlines/airline-profile/airline-profile.component';
import { ReservationsComponent } from './components/user/reservations/reservations.component';
import { CarReservationListComponent } from './components/user/reservations/car-reservation-list/car-reservation-list.component';
import { FlightReservationListComponent } from './components/user/reservations/flight-reservation-list/flight-reservation-list.component';
import { RentACarEditComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/rent-a-car-edit.component';
import { CreateFlightReservationComponent } from './components/create-flight-reservation/create-flight-reservation.component';
import { CreateCarReservationComponent } from './components/create-car-reservation/create-car-reservation.component';
import { MainDataEditComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/main-data-edit/main-data-edit.component';
import { CarsEditComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/cars-edit/cars-edit.component';
import { OfficesEditComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/offices-edit/offices-edit.component';
import { AddCarComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/add-car/add-car.component';
import { AirlineEditComponent } from './components/airlines/airline-administrator/airline-edit/airline-edit.component';
import { EditAirlineMainDataComponent } from './components/airlines/airline-administrator/airline-edit/edit-airline-main-data/edit-airline-main-data.component';
import { EditDestinationsComponent } from './components/airlines/airline-administrator/airline-edit/edit-destinations/edit-destinations.component';
import { PlanesComponent } from './components/airlines/airline-administrator/airline-edit/planes/planes.component';
import { EditPlaneComponent } from './components/airlines/airline-administrator/airline-edit/planes/edit-plane/edit-plane.component';
import { AddPlaneComponent } from './components/airlines/airline-administrator/airline-edit/planes/add-plane/add-plane.component';
import { AdminFlightListComponent } from './components/airlines/airline-administrator/airline-edit/admin-flights/admin-flight-list/admin-flight-list.component';
import { AddFlightComponent } from './components/airlines/airline-administrator/airline-edit/admin-flights/add-flight/add-flight.component';
import { AdminFlightsComponent } from './components/airlines/airline-administrator/airline-edit/admin-flights/admin-flights.component';
import { AddUserComponent } from './components/administrator/add-user/add-user.component';
import { RentCarAdminsComponent } from './components/administrator/rent-car-admins/rent-car-admins/rent-car-admins.component';
import { AirlineAdminsComponent } from './components/administrator/airline-admins/airline-admins/airline-admins.component';
import { AirlineAdministratorComponent } from './components/airlines/airline-administrator/airline-administrator.component';
import { AddAirlineComponent } from './components/airlines/airline-administrator/airline-edit/add-airline/add-airline.component';
import { RentACarAddComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-add/rent-a-car-add.component';
import { AddFirstComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-add/add-first/add-first.component';
import { AdminHomeComponent } from './components/administrator/admin-home/admin-home.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';


const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: 'search-cars',
        component: CarsSearchComponent },
      { path: 'search-flights',
        component: FlightsSearchComponent },
    ],
  },
  {path: 'admin-home',component:AdminHomeComponent,canActivate:[AuthGuard], data:{permittedRoles:['ADMINISTRATOR']}},
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'profile',
         component: UserProfileComponent,
         canActivate:[AuthGuard], data:{permittedRoles:['USER','ADMINISTRATOR','AIRLINEADMIN','RENTCARADMIN']} },

      { path: 'friends',
       component: FriendsListComponent ,
        canActivate:[AuthGuard], data:{permittedRoles:['USER']}},
      {
        path: 'reservations',
        component: ReservationsComponent,
        children: [
          { path: 'car-reservations',
            component: CarReservationListComponent ,
            canActivate:[AuthGuard], data:{permittedRoles:['USER']}},
          {
            path: 'flight-reservations',
            component: FlightReservationListComponent,
            canActivate:[AuthGuard], data:{permittedRoles:['USER']}
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
  { path: 'editService', component: RentACarEditComponent ,canActivate:[AuthGuard], data:{permittedRoles:['RENTCARADMIN']}},
  {
    path: 'create-reservation/:id',
    component: CreateFlightReservationComponent,canActivate:[AuthGuard], data:{permittedRoles:['USER']}
  },
  {
    path: 'create-reservation/:id/create-car-reservation/:carid',
    component: CreateCarReservationComponent,canActivate:[AuthGuard], data:{permittedRoles:['USER']}
  },

  {
    path: 'company-data',
    component: RentACarEditComponent,
    children: [
      { path: 'edit-main-data', component: MainDataEditComponent ,canActivate:[AuthGuard], data:{permittedRoles:['RENTCARADMIN']}},
      { path: 'edit-offices', component: OfficesEditComponent,canActivate:[AuthGuard], data:{permittedRoles:['RENTCARADMIN']} },
    ],
  },
  {path: 'airline-admin', component:AirlineAdministratorComponent,
   canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}},
  { path: 'add-airline-data', component:AddAirlineComponent,
    canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}},
  {path: 'add-first',component:AddFirstComponent,canActivate:[AuthGuard], data:{permittedRoles:['RENTCARADMIN']}},
  {path: 'add-company',component:RentACarAddComponent,canActivate:[AuthGuard], data:{permittedRoles:['RENTCARADMIN']}},
  { path: 'companyCars', component: CarsEditComponent,canActivate:[AuthGuard], data:{permittedRoles:['RENTCARADMIN']} },
  { path: 'addCar', component: AddCarComponent ,canActivate:[AuthGuard], data:{permittedRoles:['RENTCARADMIN']}},
  {
    path: 'airline-company-data',
    component: AirlineEditComponent,
    children: [
      {
        path: 'edit-airline-main-data',
        component: EditAirlineMainDataComponent,
          canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}
      },
      { path: 'edit-destinations', component: EditDestinationsComponent,
        canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}}
    ],
    canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}
  },
  {path:'admin-flights', component:AdminFlightsComponent, canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}},
  {path:'add-flight', component:AddFlightComponent, canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}},
  {path:'planes', component:PlanesComponent, canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}},
  {path:'edit-plane/:id', component:EditPlaneComponent, canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}},
    {path:'add-plane', component:AddPlaneComponent, canActivate:[AuthGuard], data:{permittedRoles:['AIRLINEADMIN']}},


  {path: 'rent-car-admins', component: RentCarAdminsComponent,canActivate:[AuthGuard], data:{permittedRoles:['ADMINISTRATOR']}},
  {path: 'airline-admins', component: AirlineAdminsComponent,canActivate:[AuthGuard], data:{permittedRoles:['ADMINISTRATOR']}},
  { path: 'add-user', component: AddUserComponent ,canActivate:[AuthGuard], data:{permittedRoles:['ADMINISTRATOR']} },
  {path: 'change-password',component:ChangePasswordComponent},
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
