import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car.model';
import Swal from 'sweetalert2';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  addCarForm:FormGroup;
  imgPreview:string | ArrayBuffer;
  brands:Array<string>;
  gearboxTypes:Array<string>;
  years:Array<number>;
  passengersNumbers:Array<number>;
  doorsNumber:Array<number>;


  constructor(private rentCarAdminService:RentCarAdministratorService, private router:Router) {

    this.addCarForm = new FormGroup({
      'brand' : new FormControl(null,Validators.required),
      'model' : new FormControl(null,Validators.required),
      'year' : new FormControl(null,Validators.required),
      'price' : new FormControl(null,[Validators.required,Validators.min(1)]),
      'maxPassengers' : new FormControl(null,Validators.required),
      'doors' : new FormControl(null,Validators.required),
      'gearboxType' : new FormControl(null,Validators.required),
      'hasAircondition' : new FormControl(null,Validators.required),
      'imageFile' : new FormControl(null,Validators.required),
      'imageSrc' : new FormControl(null,Validators.required),
    })
   }

  ngOnInit(): void {

    this.brands = new Array<string>("BMW","VW","Renault","Toyota","Peugeot","Citroen","Nissan","Audi","Yugo","Mercedec");
    this.years = new Array<number>(2020,2019,2018,2017,2016);
    this.gearboxTypes = new Array<string>("Automatic","Manual");
    this.passengersNumbers = new Array<number>(2,5,7,9);
    this.doorsNumber = new Array<number>(3,5);
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      if (file.type.match('image\/*') == null) {
      console.log("Not supported");
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgPreview = reader.result;

        console.log(this.imgPreview);
        this.addCarForm.patchValue({
          'imageSrc': reader.result
       });
      }

    }

    else{
      this.imgPreview = null;
      this.addCarForm.patchValue({
        'imageSrc': null
      });
    }
  }

  onAddCar(){

    let brand = this.addCarForm.get('brand').value;
    let model = this.addCarForm.get('model').value;
    let year = +this.addCarForm.get('year').value;
    let price = +this.addCarForm.get('price').value;
    let passengers = +this.addCarForm.get('maxPassengers').value;
    let doors = +this.addCarForm.get('doors').value;
    let hasAutomationGearbox = this.addCarForm.get('gearboxType').value==='Manual'?false:true;
    let hasAirCondition = this.addCarForm.get('hasAircondition').value==='No'?false:true;
    let image = this.addCarForm.get('imageSrc').value;

    let newCar = new Car(0,brand,model,year,price,[],image,passengers,doors,hasAirCondition,hasAutomationGearbox,'');


    if(this.rentCarAdminService.addCar(newCar)){
    Swal.fire({
      text: 'Car successfully added!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(()=>{
      this.router.navigate(['/companyCars']);
    });


  }

  }

}
