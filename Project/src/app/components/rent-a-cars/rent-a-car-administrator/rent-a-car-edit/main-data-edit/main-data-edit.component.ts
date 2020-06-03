import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { RentCarAdapter } from 'src/app/models/adapters/rent-a-car.adapter';
import Swal from 'sweetalert2';
import { Marker } from 'src/app/components/helper-classes/marker';
import { AgmMap, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-main-data-edit',
  templateUrl: './main-data-edit.component.html',
  styleUrls: ['./main-data-edit.component.css'],
})

export class MainDataEditComponent implements OnInit {
  dataForm: FormGroup;
  rentCarCompany: RentCar;
  imgPreview: string | ArrayBuffer;
  mapToggled: boolean = false;
  geocoder: any;
  zoom: number;
  marker: Marker;
  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    private rentCarService: RentCarService,
    private rentCarAdapter: RentCarAdapter,
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {
    this.dataForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        number: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        longitude : new FormControl(null),
        latitude : new FormControl(null),
      }),
      description: new FormControl(null, Validators.required),
      file: new FormControl(''),
      fileSource: new FormControl(''),
      logo: new FormControl(''),
    });

    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit(): void {

    this.rentCarService.getRentCarMainData().subscribe(
      (res) => {
        this.rentCarCompany = this.rentCarAdapter.adapt(res);
        this.setFormValues();
        this.marker = new Marker(this.rentCarCompany.address.latitude, this.rentCarCompany.address.longitude,'');
        this.marker.draggable = true;
        this.zoom = 8;
      },
      (err) => {}
    );
  }

  editData():void{
    if(this.dataForm.get('address').dirty && !this.mapToggled)
      this.checkLatLon();
    else
      this.editCompanyData();
  }

  editCompanyData(): void {
    let data = this.dataForm.value;
    data['id'] = this.rentCarCompany.id;
    data['address']['addressId'] = this.rentCarCompany.address.addressId;
    delete data['file'];
    delete data['fileSource'];

    this.rentCarService
      .editCompanyMainData(this.rentCarCompany.id, data)
      .subscribe(
        (res) => {
          Swal.fire({
            text: 'Data successfully updated.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
        },
        (err) => {
          Swal.fire({
            title: 'Unable to update data.',
            text: err.message,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
          this.setFormValues();
        }
      );
  }

  setFormValues(): void {
    this.imgPreview = this.rentCarCompany.logo;

    this.dataForm.patchValue({
      name: this.rentCarCompany.name,
      // 'address.street': this.rentCarCompany.address.street,
      // 'address.number': this.rentCarCompany.address.num,
      // 'address.city': this.rentCarCompany.address.city,
      // 'address.country': this.rentCarCompany.address.country,
      // 'address.longitude': this.rentCarCompany.address.longitude,
      // 'address.latitude': this.rentCarCompany.address.latitude,
      description: this.rentCarCompany.description,
      logo: this.rentCarCompany.logo,
    });

    this.dataForm.get('address').patchValue({
      street: this.rentCarCompany.address.street,
      number: this.rentCarCompany.address.num,
      city: this.rentCarCompany.address.city,
      country: this.rentCarCompany.address.country,
      longitude: this.rentCarCompany.address.longitude,
      latitude: this.rentCarCompany.address.latitude,
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type.match('image/*') == null) {
        console.log('Not supported');
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgPreview = reader.result;

        this.dataForm.patchValue({
          fileSource: file,
          logo: reader.result,
        });
      };
    }
  }

  onLogoClick(name: string) {
    document.getElementById(name).focus();
  }

  checkLatLon(){
      var address = this.dataForm.get('address').value;
      let street = address.street.replace(' ','+')
      let city = address.city.replace(' ','+')
      var that = this;

    fetch(('https://nominatim.openstreetmap.org/search?q='+ address.number + '+'+street+',+'+city + '&format=json&addressdetails=1&limit=1&polygon_svg=1'))
    .then(function(result){
            return result.json();
          })
          .then(function(json){
            that.dataForm.get('address').patchValue({
            'longitude' : +json[0].lon,
            'latitude' : +json[0].lat,
            })
            that.marker.lat = +json[0].lat;
            that.marker.lng = +json[0].lon;
            that.editCompanyData();
          })

  }

  onClick(event: any) {

    var that = this;

    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon='+ event.coords.lng + '&lat=' + event.coords.lat)
        .then(function(response){
          return response.json();
        }).then(function(json){

          that.marker.lat = json.lat;
          that.marker.lng = json.lon;

          that.dataForm.get('address').patchValue({
            'street' : json.address.road,
            'number' : json.address.house_number,
            'city' : json.address.city != undefined ? json.address.city : json.address.county,
            'country' : json.address.country,
            'longitude' : +json.lon,
            'latitude' : +json.lat,
          })
        })
  }

}
