import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { IgxAvatarModule } from 'igniteui-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/header/carousel/carousel.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { AirlinesComponent } from './components/airlines/airlines.component';
import { RentACarsComponent } from './components/rent-a-cars/rent-a-cars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { RentACarListComponent } from './components/rent-a-cars/rent-a-car-list/rent-a-car-list.component';
import { RentACarItemComponent } from './components/rent-a-cars/rent-a-car-item/rent-a-car-item.component';
import { CarsSearchComponent } from './components/rent-a-cars/cars-search/cars-search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RentACarSearchComponent } from './components/rent-a-cars/rent-a-car-search/rent-a-car-search.component';
import { RentCarService } from './services/rent-a-car.service';
import { CarsListComponent } from './components/rent-a-cars/cars/cars-list/cars-list.component';
import { CarItemComponent } from './components/rent-a-cars/cars/car-item/car-item.component';
import { UserComponent } from './components/user/user.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { FriendsListComponent } from './components/user/friends-list/friends-list.component';
import { UserService } from './services/user-service.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarsSearchFormComponent } from './components/rent-a-cars/cars-search/cars-search-form/cars-search-form.component';
import { CarsComponent } from './components/rent-a-cars/cars/cars.component';
import { AirlinesListComponent } from './components/airlines/airlines-list/airlines-list.component';
import { AirlineItemComponent } from './components/airlines/airline-item/airline-item.component';
import { AirlineService } from './services/airline.service';
import { FlightsSearchComponent } from './components/airlines/flights-search/flights-search.component';
import { FlightsSerachFormComponent } from './components/airlines/flights-search/flights-search-form/flights-search-form.component';
import { FlightListComponent } from './components/airlines/flights/flight-list/flight-list.component';
import { FlightItemComponent } from './components/airlines/flights/flight-item/flight-item.component';
import { FlightsComponent } from './components/airlines/flights/flights.component';
import { RoundFlightItemComponent } from './components/airlines/flights/round-flight-item/round-flight-item.component';
import { RentACarProfileComponent } from './components/rent-a-cars/rent-a-car-profile/rent-a-car-profile.component';
import { FlightsFilterComponent } from './components/airlines/flights/flights-filter/flights-filter.component';
import { ProfileNavbarComponent } from './components/common/profile-navbar/profile-navbar.component';
import { ProfileOfficesComponent } from './components/common/profile-offices/profile-offices.component';
import { AirlineProfileComponent } from './components/airlines/airline-profile/airline-profile.component';
import { CarsCardsComponent } from './components/rent-a-cars/rent-a-car-profile/cars-cards/cars-cards.component';
import { HammerModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { IgxTimePickerModule } from 'igniteui-angular';
import { ReservationsComponent } from './components/user/reservations/reservations.component';
import { CarReservationListComponent } from './components/user/reservations/car-reservation-list/car-reservation-list.component';
import { CarReservationItemComponent } from './components/user/reservations/car-reservation-item/car-reservation-item.component';
import { FlightReservationItemComponent } from './components/user/reservations/flight-reservation-item/flight-reservation-item.component';
import { FlightReservationListComponent } from './components/user/reservations/flight-reservation-list/flight-reservation-list.component';
import { NgbDateCustomParserFormatter } from './services/date-formatter.service';
import { RateDialogComponent } from './components/user/reservations/rate-dialog/rate-dialog.component';
import { CarReservationsService } from './services/car-reservations.service';
import { RentACarEditComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/rent-a-car-edit.component';
import { MainDataEditComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/main-data-edit/main-data-edit.component';
import { CarsEditComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/cars-edit/cars-edit.component';
import { PlaneLayoutComponent } from './components/plane-layout/plane-layout.component';
import { CreateFlightReservationComponent } from './components/create-flight-reservation/create-flight-reservation.component';
import { CreateCarReservationComponent } from './components/create-car-reservation/create-car-reservation.component';
import { OfficesEditComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/offices-edit/offices-edit.component';
import { AddCarComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-edit/add-car/add-car.component';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AirlineEditComponent } from './components/airlines/airline-administrator/airline-edit/airline-edit.component';
import { EditAirlineMainDataComponent } from './components/airlines/airline-administrator/airline-edit/edit-airline-main-data/edit-airline-main-data.component';
import { EditDestinationsComponent } from './components/airlines/airline-administrator/airline-edit/edit-destinations/edit-destinations.component';
import { PlanesComponent } from './components/airlines/airline-administrator/airline-edit/planes/planes.component';
import { PlaneListComponent } from './components/airlines/airline-administrator/airline-edit/planes/plane-list/plane-list.component';
import { AddPlaneComponent } from './components/airlines/airline-administrator/airline-edit/planes/add-plane/add-plane.component';
import { EditPlaneComponent } from './components/airlines/airline-administrator/airline-edit/planes/edit-plane/edit-plane.component';
import { AddFlightComponent } from './components/airlines/airline-administrator/airline-edit/admin-flights/add-flight/add-flight.component';
import { AdminFlightsComponent } from './components/airlines/airline-administrator/airline-edit/admin-flights/admin-flights.component';
import { AdminFlightListComponent } from './components/airlines/airline-administrator/airline-edit/admin-flights/admin-flight-list/admin-flight-list.component';
import { AddUserComponent } from './components/administrator/add-user/add-user.component';
import { AdministratorService } from './services/administrator.service';
import { FooterComponent } from './components/footer/footer.component';
import { UsersListComponent } from './components/administrator/users-list/users-list.component';
import { UsersItemComponent } from './components/administrator/users-item/users-item.component';
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
import { RentCarAdapter } from './models/adapters/rent-a-car.adapter';
import { AddressAdapter } from './models/adapters/address.adapter';
import { NgxSpinnerModule } from "ngx-spinner";
import { RentCarProfileAdapter } from './models/adapters/rent-a-car-profile.adapter';
import { OfficeAdapter } from './models/adapters/office.adapter';
import { RentCarAdminsComponent } from './components/administrator/rent-car-admins/rent-car-admins/rent-car-admins.component';
import { AirlineAdminsComponent } from './components/administrator/airline-admins/airline-admins/airline-admins.component';
import { AirlineAdministratorComponent } from './components/airlines/airline-administrator/airline-administrator.component';
import { AddAirlineComponent } from './components/airlines/airline-administrator/airline-edit/add-airline/add-airline.component';
import { RentCarOfficesService } from './services/rent-car-offices.service';
import { CarService } from './services/car.service';
import { AdminHomeComponent } from './components/administrator/admin-home/admin-home.component';
import { AdminHomeCounterCardComponent } from './components/administrator/admin-home-counter-card/admin-home-counter-card.component';
import { RentACarAddComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-add/rent-a-car-add.component';
import { AddFirstComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-add/add-first/add-first.component';
import { DiscountDateService } from './services/discount-date.service';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { BonusPointsComponent } from './components/administrator/bonus-points/bonus-points.component';
import { BonusPointsDiscountService } from './services/bonus-points-discount.service';
import { ChartsModule } from 'ng2-charts';
import { RentACarHomeComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-home/rent-a-car-home.component';
import { BarChartComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-home/bar-chart/bar-chart.component';
import { NavBarComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-home/nav-bar/nav-bar.component';
import { IncomesComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-home/incomes/incomes.component';;
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MonthlyIncomesComponent } from './components/rent-a-cars/rent-a-car-administrator/rent-a-car-home/monthly-incomes/monthly-incomes.component';
import { RatesService } from './services/rates.service';

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
    AdminHomeCounterCardComponent,
    ChangePasswordComponent,
    BonusPointsComponent,
    RentACarHomeComponent,
    BarChartComponent,
    NavBarComponent,
    IncomesComponent,
    MonthlyIncomesComponent
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
    ChartsModule,
    MatDatepickerModule
  ],
  providers: [
    UserService,
    RentCarService,
    AirlineService,
    CarReservationsService,
    AdministratorService,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthService,
    AddressAdapter,
    RentCarAdapter,
    RentCarProfileAdapter,
    OfficeAdapter,
    RentCarOfficesService,
    DiscountDateService,
    CarService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    GoogleMapsAPIWrapper,
    SocialLoginModule,
    BonusPointsDiscountService,
    RatesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
