import { Component, Input, ViewChild, NgZone, OnInit, OnDestroy } from '@angular/core';
import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Address } from '../../models/address';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user-service.service';
import { Marker } from '../helper-classes/marker';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
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

  onClick(event: any, markerIndex: number) {
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
        this.markers[markerIndex].lat = event.coords.lat;
        this.markers[markerIndex].lng = event.coords.lng;
      });
  }

  ngOnDestroy(){
    this.changeMapMarkers.unsubscribe();
  }
}
