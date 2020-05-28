import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})


export class MapboxComponent implements OnInit {




    constructor(private httpClient:HttpClient) { }
    ngOnInit() {
      var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
      var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
      var MapboxClient = require('mapbox');



      mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kamVsYTk3IiwiYSI6ImNrYXF6amMyaDA0eXozMW9jYWh2NzNueG8ifQ._M7HxG3A9IAHzoVx6uQyow';
      var client = new MapboxClient(mapboxgl.accessToken);
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
      });

//       map.on('click', (e) => { new mapboxgl.Marker()
//         .setLngLat(e.lngLat)
//         .addTo(map);
//         console.log(e.lngLat);

//          e.lngLat.lng = + e.lngLat.lng;
//          e.lngLat.lat = +e.lngLat.lat;
//       //  console.log(lng);
//        // console.log(lat);

//        var obj = {
//          'logitude' : e.lngLat.lng,
//          'latitude' : e.lngLat.lat
//        }

//        console.log(obj);

//        client.geocodeReverse(
//         "-58.5003038, -34.5741957"
//        )
//       // .send()
//        .then(function(res) {
//          // res is the http response, including: status, headers and entity properties

//          console.log(res);

//          var data = res.entity; // data is the geocoding result as parsed JSON
//          var feature = data.features[0];
//          new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
//          map.center = feature.center;
//          console.log(feature);
//  });
 // });


 map.on("click", function(ev) {
  this.httpClient.get(
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      ev.lngLat.lon + "," + ev.lngLat.lat + ".json?access_token=" + mapboxgl.accessToken).subscribe(
    function(data) {
      console.log(data);
    }
  ).fail(function(jqXHR, textStatus, errorThrown) {
    alert("There was an error while geocoding: " + errorThrown);
  });
});


      map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
        );

        client.geocodeForward('72 Cara Dusana Novi Sad Serbia')
        .then(function(res) {
          // res is the http response, including: status, headers and entity properties
          var data = res.entity; // data is the geocoding result as parsed JSON
          var feature = data.features[0];
          new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
          map.center = feature.center;
          console.log(feature);
        })
        .catch(function(err) {
          // handle errors
        });
  }
}
