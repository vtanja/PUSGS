import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

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


  constructor(private carService:CarService, private router:Router) {

    this.addCarForm = new FormGroup({
      'brand' : new FormControl(null,Validators.required),
      'model' : new FormControl(null,Validators.required),
      'year' : new FormControl(null,Validators.required),
      'price' : new FormControl(null,[Validators.required,Validators.min(1)]),
      'passengers' : new FormControl(null,Validators.required),
      'doors' : new FormControl(null,Validators.required),
      'hasAutomationGearbox' : new FormControl(null,Validators.required),
      'hasAirCondition' : new FormControl(null,Validators.required),
      'imageFile' : new FormControl(null,Validators.required),
      'image' : new FormControl(null,Validators.required),
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
        this.addCarForm.patchValue({
          'image':  reader.result
       });
      }
    }
    else{
      this.imgPreview = null;
      this.addCarForm.patchValue({
        'image': null
      });
    }
  }

  onAddCar(){

    let newCar = this.addCarForm.value;
    newCar["doors"] = +newCar["doors"];
    newCar["passengers"] = +newCar["passengers"];
    newCar["year"] = +newCar["year"];
    newCar["hasAutomationGearbox"] = newCar["hasAutomationGearbox"]==='true'?true:false;
    newCar["hasAirCondition"] = newCar["hasAirCondition"]==='true'?true:false;
    newCar["year"] = +newCar["year"];
    delete(newCar['imageFile']);

    console.log(newCar);

    this.carService.addCar(newCar).subscribe(
      res=>{
        Swal.fire({
          text: 'Car successfully added!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        }).then(()=>{
          this.addCarForm.reset();
          this.router.navigate(['/companyCars']);
        });
      },
      err=>{
        console.log(err);
        Swal.fire({
          text: err.errors.message,
          icon: 'error',
          showConfirmButton: true,
        });
      }
    );



  }

}


