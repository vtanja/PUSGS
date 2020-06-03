export class Marker {
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
