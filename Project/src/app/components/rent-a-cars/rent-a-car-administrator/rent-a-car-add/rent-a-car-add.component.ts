import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MapsAPILoader, GoogleMapsAPIWrapper, AgmMap } from '@agm/core';
import { Marker } from 'src/app/components/helper-classes/marker';

declare var google: any;

@Component({
  selector: 'app-rent-a-car-add',
  templateUrl: './rent-a-car-add.component.html',
  styleUrls: ['./rent-a-car-add.component.css'],
})
export class RentACarAddComponent implements OnInit {
  dataForm: FormGroup;
  imgPreview: string | ArrayBuffer;
  mapToggled: boolean = false;
  geocoder: any;
  zoom: number;
  marker: Marker;
  mapClicked: boolean = false;
  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    private rentCarService: RentCarService,
    private router: Router,
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        number: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        latitude: new FormControl(null),
        longitude: new FormControl(null),
      }),
      description: new FormControl(null, Validators.required),
      file: new FormControl(''),
      fileSource: new FormControl(''),
      logo: new FormControl(''),
    });

    this.marker = new Marker(45.2671, 19.8335, '');
    this.marker.draggable = true;
    this.zoom = 8;
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

  addCompany() {
    let data = this.dataForm.value;
    delete data['file'];
    delete data['fileSource'];

    this.rentCarService.addCompany(data).subscribe(
      (res) => {
        this.dataForm.reset();
        Swal.fire({
          text: "Company main data added!Let's add offices!",
          icon: 'success',
          showConfirmButton: false,
          timer: 2300,
        });

        this.rentCarService.firstCompanyAdded.next(true);
        this.router.navigateByUrl('/company-data/edit-offices');
      },
      (err) => {
        Swal.fire({
          text: err.error.message,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#de8e26',
        });
      }
    );
  }

  onAdd() {
    if (this.dataForm.get('address').value.latitude === null) {
      var address = this.dataForm.get('address').value;
      let street = address.street.replace(' ', '+');
      let city = address.city.replace(' ', '+');
      var that = this;

      fetch(
        'https://nominatim.openstreetmap.org/search?q=' +
          address.number +
          '+' +
          street +
          ',+' +
          city +
          '&format=json&addressdetails=1&limit=1&polygon_svg=1'
      )
        .then(function (result) {
          return result.json();
        })
        .then(function (json) {
          that.dataForm.get('address').patchValue({
            longitude: +json[0].lon,
            latitude: +json[0].lat,
          });
          that.marker.lat = +json[0].lat;
          that.marker.lng = +json[0].lon;
          that.addCompany();
        });
    } else {
      this.addCompany();
    }
  }

  onClick(event: any) {
    var that = this;
    this.mapClicked = true;

    fetch(
      'http://nominatim.openstreetmap.org/reverse?format=json&lon=' +
        event.coords.lng +
        '&lat=' +
        event.coords.lat
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        that.marker.lat = json.lat;
        that.marker.lng = json.lon;

        that.dataForm.get('address').patchValue({
          street: json.address.road,
          number: json.address.house_number,
          city:
            json.address.city != undefined
              ? json.address.city
              : json.address.county,
          country: json.address.country,
          longitude: +json.lon,
          latitude: +json.lat,
        });
      });
  }
}
