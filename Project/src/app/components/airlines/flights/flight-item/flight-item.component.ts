import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.css']
})
export class FlightItemComponent implements OnInit, AfterViewInit{

  @Input() flight:Flight;
  closeResult = '';
  readonly image:string='../../../../../assets/images/airlines/';
  imgToDisplay:string='';
  hours:number;
  minutes:number;
  showBuyButton = true;
  price:number;

  constructor( private modalService: NgbModal, private airlineService:AirlineService, private route:ActivatedRoute, private router:Router, private userService:UserService) { 
    
  }
  ngAfterViewInit(): void {
    this.airlineService.getAirline(this.flight.plane.airlineId).subscribe((res:any)=>{
      this.imgToDisplay = this.image+res.image;
    })

  }

  ngOnInit(): void {

    if(!this.userService.isUserLoggedIn()){
      this.showBuyButton= false;
    }

    if(this.route.snapshot.routeConfig.path.includes('admin-flights')){
      this.showBuyButton=false;
    }
    else{
      var klasa = this.route.snapshot.queryParams['class'];
      this.price = this.flight.segmentPrices.find(x=>x.segment.name === klasa).price;
    }
    this.hours = Math.floor(this.flight.duration/60);
    this.minutes = this.flight.duration%60;
    // this.thirdFormGroup = this._formBuilder.group({
    //   passengers: this._formBuilder.array([
    //     this._formBuilder.group({
    //       'seat':[''],
    //       'firstName':[''],
    //       'lastName':[''],
    //       'passport': ['']
    //     })
    //   ])
    // });
    // this.fourthFormGroup = this._formBuilder.group({
    //   fourthCtrl: ['', Validators.required]
    // });

    
  
  }

 

  
  buyTicket(){
    var klasa = this.route.snapshot.queryParams['class'];
    var passengers = this.route.snapshot.queryParams['passengers'];

    this.router.navigate(['/create-reservation', this.flight.id, klasa, passengers]);
  }

  moreInfo(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
}
