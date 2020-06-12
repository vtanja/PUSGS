import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class DateService implements OnInit{
  constructor(){}
  addresses:string[] = [];
  ngOnInit(): void {
    this.addresses=['a','b','c'];
  }

  getAddresses(){
    return this.addresses;
  }
}
