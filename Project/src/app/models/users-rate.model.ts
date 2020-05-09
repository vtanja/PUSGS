export class UsersRate{

  rate:number;
  username:String;
  reservationId:number;

  constructor(rate:number,usrname:string,resID:number){
    this.rate=rate;
    this.username=usrname;
    this.reservationId=resID;
  }
}
