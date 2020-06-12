import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RentCarOfficesService } from 'src/app/services/rent-car-offices.service';
import Swal from 'sweetalert2';
import { MapsAPILoader, GoogleMapsAPIWrapper, AgmMap } from '@agm/core';
import { Marker } from 'src/app/components/helper-classes/marker';

declare var google: any;

@Component({
  selector: 'app-offices-edit',
  templateUrl: './offices-edit.component.html',
  styleUrls: ['./offices-edit.component.css'],
})

export class OfficesEditComponent implements OnInit {
  offices: {};
  addOfficeForm: FormGroup;
  closeResult: string;
  geocoder: any;
  zoom: number;
  marker: Marker;
  mapClicked: boolean = false;
  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    private modalService: NgbModal,
    private officesService: RentCarOfficesService,
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {
    this.addOfficeForm = new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      longitude: new FormControl(''),
      latitude: new FormControl(''),
    });

    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit(): void {
    this.marker = new Marker(45.20, 19.51, '');
    this.marker.draggable = true;
    this.zoom = 6;

    this.modalService.dismissAll();
    this.officesService.getOffices().subscribe(
      (res) => {
        this.offices = res;
      },
      (err) => {}
    );
  }

  openModal(content) {
    this.marker = new Marker(45.20, 19.51, '');
    this.addOfficeForm.reset();

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title-adm',
        centered:true,
        backdropClass: 'light-purple-backdrop',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  addOffice() {
    let data = this.addOfficeForm.value;
    let address = { address: data };

    this.officesService.addOffice(address).subscribe(
      (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.updateOfficesAdd(res);

        Swal.fire({
          text: 'Office successfully added',
          showConfirmButton: false,
          icon: 'success',
          timer: 2000,
        });
        this.addOfficeForm.reset();
      },
      (err) => {
        console.log(err);
        Swal.fire({
          text: err.errors.message,
          showConfirmButton: true,
          icon: 'error',
        });
      }
    );
  }

  updateOfficesAdd(office: {}) {
    if (this.offices[office['country']] === undefined) {
      let arr = [];
      arr.push(office);
      this.offices[office['country']] = arr;
    } else {
      this.offices[office['country']].push(office);
    }
  }

  officesEmpty(): boolean {
    return this.offices === undefined || Object.keys(this.offices).length === 0;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  checkLatLon() {
    if (
      this.addOfficeForm.get('longitude').value === '' ||
      this.addOfficeForm.get('longitude').value === null
    ) {
      var address = this.addOfficeForm.value;
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
          that.addOfficeForm.patchValue({
            longitude: +json[0].lon,
            latitude: +json[0].lat,
          });
          that.marker.lat = +json[0].lat;
          that.marker.lng = +json[0].lon;
          that.addOffice();
        });
    } else {
      this.addOffice();
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

        that.addOfficeForm.patchValue({
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
