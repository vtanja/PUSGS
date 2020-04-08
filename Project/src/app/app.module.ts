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
import { UserService } from './userService.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { RentCarService } from './rent-a-cars/rent-a-car.service';
import { RentACarListComponent } from './rent-a-cars/rent-a-car-list/rent-a-car-list.component';
import { RentACarItemComponent } from './rent-a-cars/rent-a-car-item/rent-a-car-item.component';
import { CarsSearchComponent } from './rent-a-cars/cars-search/cars-search.component';

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
    RentACarListComponent,
    RentACarItemComponent,
    CarsSearchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2TelInputModule,
    ShowHidePasswordModule
  ],
  providers: [
    UserService,
    RentCarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
