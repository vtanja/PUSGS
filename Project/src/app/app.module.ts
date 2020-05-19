import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import{ MatInputModule } from '@angular/material/input'
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
import { SearchPipe } from './user/friends-list/search.pipe';
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
import { FilterPipe } from './airlines/flights/filter.pipe';
import { RoundFlightsFilterPipe } from './airlines/flights/round-flights-filter.pipe';
import { ProfileNavbarComponent } from './common/profile-navbar/profile-navbar.component';
import { ProfileOfficesComponent } from './common/profile-offices/profile-offices.component';
import { AirlineProfileComponent } from './airlines/airline-profile/airline-profile.component';
import { CarsCardsComponent } from './rent-a-cars/rent-a-car-profile/cars-cards/cars-cards.component';
import { SortByPipe } from './common/sort-by.pipe';
import { HammerModule } from "@angular/platform-browser";
import { ToastrModule } from 'ngx-toastr';
import { IgxTimePickerModule } from 'igniteui-angular';
import { ReservationsComponent } from './user/reservations/reservations.component';
import { CarReservationListComponent } from './user/reservations/car-reservation-list/car-reservation-list.component';
import { CarReservationItemComponent } from './user/reservations/car-reservation-item/car-reservation-item.component';
import { FlightReservationItemComponent } from './user/reservations/flight-reservation-item/flight-reservation-item.component';
import { FlightReservationListComponent } from './user/reservations/flight-reservation-list/flight-reservation-list.component';
import {NgbDateCustomParserFormatter} from './services/date-formatter.service';
import { RateDialogComponent } from './user/reservations/rate-dialog/rate-dialog.component'
import { CarReservationsService } from './services/car-reservations.service';
import { RentACarAdministratorComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-administrator.component';
import { RentACarEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/rent-a-car-edit.component';
import { MainDataEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/main-data-edit/main-data-edit.component';
import { CarsEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/cars-edit/cars-edit.component';
import {MatStepperModule} from '@angular/material/stepper';
import { PlaneLayoutComponent } from './plane-layout/plane-layout.component';
import { MatSelectModule } from '@angular/material/select';
import { CreateFlightReservationComponent } from './create-flight-reservation/create-flight-reservation.component';
import {MatChipsModule} from '@angular/material/chips';
import { CreateCarReservationComponent } from './create-car-reservation/create-car-reservation.component';
import { RentCarAdministratorService } from './services/rent-car-administrator.service';
import { OfficesEditComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/offices-edit/offices-edit.component';
import { AddCarComponent } from './rent-a-cars/rent-a-car-administrator/rent-a-car-edit/add-car/add-car.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AirlineEditComponent } from './airlines/airline-administrator/airline-edit/airline-edit.component';
import { EditAirlineMainDataComponent } from './airlines/airline-administrator/airline-edit/edit-airline-main-data/edit-airline-main-data.component';
import { EditDestinationsComponent } from './airlines/airline-administrator/airline-edit/edit-destinations/edit-destinations.component';
import { AddUserComponent } from './administrator/add-user/add-user.component';
import { AdministratorService } from './services/administrator.service';
import { FooterComponent } from './footer/footer.component';
import { UsersListComponent } from './administrator/users-list/users-list.component';
import { UsersItemComponent } from './administrator/users-item/users-item.component';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';

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
    AddUserComponent,
    FooterComponent,
    UsersListComponent,
    UsersItemComponent,

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
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAdtC28jUsGI3OLfTvoocC32_XqBVcXAes'}),
    FormsModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UserService,
    RentCarService,
    AirlineService,
    CarReservationsService,
    RentCarAdministratorService,
    AdministratorService,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},
    {provide: HTTP_INTERCEPTORS, useClass:HttpTokenInterceptor,multi:true},
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
