import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Address } from '../models/address';
import { Subscription } from 'rxjs';
import { UserService } from '../services/userService.service';

declare var google: any;

class Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;

  constructor(lat: number, long: number, label: string) {
    this.lat = lat;
    this.lng = long;
    this.label = label;
    this.draggable = false;
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  geocoder: any;
  @Input('addresses') addresses: Address[];
  @Input('address') address: Address;
  @Input('shouldSubscribe') shouldSubscribe: boolean;
  zoom: number;
  markers: Marker[];
  changeMapMarkers: Subscription;

  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private userService: UserService
  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    if (this.shouldSubscribe) {
      this.changeMapMarkers = this.userService.changeMap.subscribe(
        (address: Address) => {
          this.markers = [];
          this.markers.push(
            new Marker(address.latitude, address.longitude, address.toString())
          );
        }
      );
    }

    this.markers = [];

    if (this.address != undefined) {
      this.addresses = [];
      this.addresses.push(this.address);
    }

    this.addresses.forEach((address) => {
      this.markers.push(
        new Marker(address.latitude, address.longitude, address.toString())
      );
    });

    this.zoom = 5;
  }

  async reverseGeocode(
    num: number,
    street: string,
    city: string,
    country: string
  ) {
    const data = await fetch(
      'https://nominatim.openstreetmap.org/search?q=' +
        num +
        '+' +
        street +
        ',+' +
        city +
        ',+' +
        country +
        '&format=json',
      {
        headers: {
          'Accept-Language': 'en-US',
        },
      }
    );

    const res = await data.json();
  }

  onClick(event: any, markerIndex: number) {
    this.markers[markerIndex].lat = event.coords.lat;
    this.markers[markerIndex].lng = event.coords.lng;
  }
}
