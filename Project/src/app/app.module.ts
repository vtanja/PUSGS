import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { IgxAvatarModule } from 'igniteui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { RentACarListComponent } from './rent-a-cars/rent-a-car-list/rent-a-car-list.component';
import { RentACarItemComponent } from './rent-a-cars/rent-a-car-item/rent-a-car-item.component';
import { CarsSearchComponent } from './rent-a-cars/cars-search/cars-search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RentACarSearchComponent } from './rent-a-cars/rent-a-car-search/rent-a-car-search.component';
import { RentCarService } from './services/rent-a-car.service';
import { CarsListComponent } from './rent-a-cars/cars/cars-list/cars-list.component';
import { CarItemComponent } from './rent-a-cars/cars/car-item/car-item.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FriendsListComponent } from './user/friends-list/friends-list.component';
import { UserService } from './services/user-service.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsSearchFormComponent } from './rent-a-cars/cars-search/cars-search-form/cars-search-form.component';
import { CarsComponent } from './rent-a-cars/cars/cars.component';
import { AirlinesListComponent } from './airlines/airlines-list/airlines-list.component';
import { AirlineItemComponent } from './airlines/airline-item/airline-item.component';
import { AirlineService } from './services/airline.service';
import { FlightsSearchComponent } from './airlines/flights-search/flights-search.component';
import { FlightsSerachFormComponent } from './airlines/flights-search/flights-search-form/flights-search-form.component';
import { FlightListComponent } from './airlines/flights/flight-list/flight-list.component';
import { FlightItemComponent } from './airlines/flights/flight-item/flight-item.component';
import { FlightsComponent } from './airlines/flights/flights.component';
import { RoundFlightItemComponent } from './airlines/flights/round-flight-item/round-flight-item.component';
import { RentACarProfileComponent } from './rent-a-cars/rent-a-car-profile/rent-a-car-profile.component';
import { CarsCarouselComponent } from './rent-a-cars/rent-a-car-profile/cars-carousel/cars-carousel.component';
import { FlightsFilterComponent } from './airlines/flights/flights-filter/flights-filter.component';
import { ProfileNavbarComponent } from './common/profile-navbar/profile-navbar.component';
import { ProfileOfficesComponent } from './common/profile-offices/profile-offices.component';
import { AirlineProfileComponent } from './airlines/airline-profile/airline-profile.component';
import { CarsCardsComponent } from './rent-a-cars/rent-a-car-profile/cars-cards/cars-cards.component';
import { HammerModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { IgxTimePickerModule } from 'igniteui-angular';
import { ReservationsComponent } from './user/reservations/reservations.component';
import { CarReservationListComponent } from './user/reservations/car-reservation-list/car-reservation-list.component';
import { CarReservationItemComponent } from './user/reservations/car-reservation-item/car-reservation-item.component';
import { FlightReservationItemComponent } from './user/reservations/flight-reservation-item/flight-reservation-item.component';
import { FlightReservationListComponent } from './user/reservations/flight-reservation-list/flight-reservation-list.component';
import { NgbDateCustomParserFormatter } from './services/date-formatter.service';
import { RateDialogComponent } from './user/reservations/rate-dialog/rate-dialog.component';
import { CarReservationsService } from './services/car-reservations.service';
import { RentACarAdministratorComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-administrator.component';
import { RentACarEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/rent-a-car-edit.component';
import { MainDataEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/main-data-edit/main-data-edit.component';
import { CarsEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/cars-edit/cars-edit.component';
import { PlaneLayoutComponent } from './plane-layout/plane-layout.component';
import { CreateFlightReservationComponent } from './create-flight-reservation/create-flight-reservation.component';
import { CreateCarReservationComponent } from './create-car-reservation/create-car-reservation.component';
import { RentCarAdministratorService } from './services/rent-car-administrator.service';
import { OfficesEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/offices-edit/offices-edit.component';
import { AddCarComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/add-car/add-car.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AirlineEditComponent } from './airlines/airline-administrator/airline-edit/airline-edit.component';
import { EditAirlineMainDataComponent } from './airlines/airline-administrator/airline-edit/edit-airline-main-data/edit-airline-main-data.component';
import { EditDestinationsComponent } from './airlines/airline-administrator/airline-edit/edit-destinations/edit-destinations.component';
import { PlanesComponent } from './airlines/airline-administrator/airline-edit/planes/planes.component';
import { PlaneListComponent } from './airlines/airline-administrator/airline-edit/planes/plane-list/plane-list.component';
import { AddPlaneComponent } from './airlines/airline-administrator/airline-edit/planes/add-plane/add-plane.component';
import { EditPlaneComponent } from './airlines/airline-administrator/airline-edit/planes/edit-plane/edit-plane.component';
import { AddFlightComponent } from './airlines/airline-administrator/airline-edit/admin-flights/add-flight/add-flight.component';
import { AdminFlightsComponent } from './airlines/airline-administrator/airline-edit/admin-flights/admin-flights.component';
import { AdminFlightListComponent } from './airlines/airline-administrator/airline-edit/admin-flights/admin-flight-list/admin-flight-list.component';
import { AddUserComponent } from './administrator/add-user/add-user.component';
import { AdministratorService } from './services/administrator.service';
import { FooterComponent } from './footer/footer.component';
import { UsersListComponent } from './administrator/users-list/users-list.component';
import { UsersItemComponent } from './administrator/users-item/users-item.component';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { SearchPipe } from './pipes/search.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { RoundFlightsFilterPipe } from './pipes/round-flights-filter.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { SocialLoginModule, AuthServiceConfig,AuthService, LoginOpt } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
// import { CountoModule }  from 'angular2-counto';
import { RentCarAdapter } from './models/adapters/rent-a-car.adapter';
import { AddressAdapter } from './models/adapters/address.adapter';
import { NgxSpinnerModule } from "ngx-spinner";
import { RentCarProfileAdapter } from './models/adapters/rent-a-car-profile.adapter';
import { OfficeAdapter } from './models/adapters/office.adapter';
import { RentCarAdminsComponent } from './administrator/rent-car-admins/rent-car-admins/rent-car-admins.component';
import { AirlineAdminsComponent } from './administrator/airline-admins/airline-admins/airline-admins.component';
import { AirlineAdministratorComponent } from './airlines/airline-administrator/airline-administrator.component';
import { AddAirlineComponent } from './airlines/airline-administrator/airline-edit/add-airline/add-airline.component';
import { RentCarOfficesService } from './services/rent-car-offices.service';
import { CarService } from './services/car.service';
import { AdminHomeComponent } from './administrator/admin-home/admin-home.component';
import { AnimatedDigitComponent } from './../animated/animated-digit.compoanent';
import { AdminHomeCounterCardComponent } from './administrator/admin-home-counter-card/admin-home-counter-card.component';
import { MapboxComponent } from './mapbox/mapbox.component';
import { RentACarAddComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-add/rent-a-car-add.component';
import { AddFirstComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-add/add-first/add-first.component';

const fbLoginOptions: LoginOpt = {
  scope: 'first_name,last_name,name,email',
  return_scopes: true,
  enable_profile_selector: true
};

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
};

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("63207347059-po3ghnjgnptsdls0u5a25vp2ak1j197d.apps.googleusercontent.com", googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("179484520010513")
  }
]);

export function provideConfig() {
  return config;
}

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
    FlightsSearchComponent,
    FlightsSerachFormComponent,
    FlightListComponent,
    FlightItemComponent,
    FlightsComponent,
    RoundFlightItemComponent,
    RentACarProfileComponent,
    CarsCarouselComponent,
    FlightsFilterComponent,
    FilterPipe,
    RoundFlightsFilterPipe,
    ProfileNavbarComponent,
    ProfileOfficesComponent,
    AirlineProfileComponent,
    CarsCardsComponent,
    SortByPipe,
    ReservationsComponent,
    CarReservationListComponent,
    CarReservationItemComponent,
    FlightReservationItemComponent,
    FlightReservationListComponent,
    RateDialogComponent,
    RentACarAdministratorComponent,
    RentACarEditComponent,
    MainDataEditComponent,
    CarsEditComponent,
    PlaneLayoutComponent,
    CreateFlightReservationComponent,
    CreateCarReservationComponent,
    OfficesEditComponent,
    AddCarComponent,
    MapComponent,
    AirlineEditComponent,
    EditAirlineMainDataComponent,
    EditDestinationsComponent,
    PlanesComponent,
    PlaneListComponent,
    AddPlaneComponent,
    EditPlaneComponent,
    AddFlightComponent,
    AdminFlightListComponent,
    AdminFlightsComponent,
    AddUserComponent,
    FooterComponent,
    UsersListComponent,
    UsersItemComponent,
    RentCarAdminsComponent,
    AirlineAdminsComponent,
    AirlineAdministratorComponent,
    AddAirlineComponent,
    RentACarAddComponent,
    AddFirstComponent,
    AdminHomeComponent,
    AnimatedDigitComponent,
    AdminHomeCounterCardComponent,
    MapboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2TelInputModule,
    ShowHidePasswordModule,
    Ng2SearchPipeModule,
    MatSortModule,
    IgxAvatarModule,
    MatAutocompleteModule,
    MatInputModule,
    HammerModule,
    IgxTimePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdtC28jUsGI3OLfTvoocC32_XqBVcXAes',
    }),
    FormsModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgSelectModule,
    // CountoModule
  ],
  providers: [
    UserService,
    RentCarService,
    AirlineService,
    CarReservationsService,
    RentCarAdministratorService,
    AdministratorService,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthService,
    AddressAdapter,
    RentCarAdapter,
    RentCarProfileAdapter,
    OfficeAdapter,
    RentCarOfficesService,
    CarService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    GoogleMapsAPIWrapper,
    SocialLoginModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
